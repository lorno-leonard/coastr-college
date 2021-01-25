const _ = require('lodash');

const GeneralHelper = require('../../helpers/general');
const ResponseHelper = require('../../helpers/response');
const ExistenseHelper = require('../../helpers/existence');

module.exports = {
	getBranches: async ctx => {
		const {
			college_id,
			page,
			limit
		} = ctx.request.query;
		const skip = limit * (page - 1);
		const { models } = ctx.custom;

		// format query
		const query = {
			...(college_id && { college_id })
		};

		const Branch = models.branch;
		const total = await Branch.countDocuments(query);
		const branches = await Branch.find(query)
			.limit(limit)
			.skip(skip)
			.sort({ name: 1 })
			.populate('college_id')
			.lean();

		ctx.body = ResponseHelper.generateResponse(200, 'Success', {
			total,
			page,
			limit,
			count: branches.length,
			branches
		});
	},
	getBranchById: async ctx => {
		const { id } = ctx.params;
		const { models } = ctx.custom;

		const Branch = models.branch;
		const branch = await Branch.findById(id)
			.populate('college_id')
			.lean();

		if (!branch) {
			ctx.body = ResponseHelper.generateNotFoundResponse('Branch');
			return;
		}

		ctx.body = ResponseHelper.generateResponse(200, 'Success', { branch });
	},
	createBranch: async ctx => {
		const { branch: bodyBranch } = ctx.request.body;
		const { college_id, name } = bodyBranch;
		const { models } = ctx.custom;
		const { exists } = ExistenseHelper;

		const Branch = models.branch;

		// Check name
		if (await exists({ name, college_id }, Branch)) {
			ctx.body = ResponseHelper.generateResponse(403, `Branch with name ${name} already exists!`);
			return;
		}

		// create
		const branch = new Branch();
		branch.college_id = college_id;
		branch.name = name;
		await branch.save();

		ctx.body = ResponseHelper.generateResponse(200, 'Success', { branch });
	},
	updateBranchById: async ctx => {
		const { id } = ctx.params;
		const { branch: bodyBranch } = ctx.request.body;
		const { name, updated_at } = bodyBranch;
		const { models } = ctx.custom;
		const { exists } = ExistenseHelper;

		const Branch = models.branch;

		// Check branch
		const branch = await Branch.findById(id);
		if (!branch) {
			ctx.body = ResponseHelper.generateNotFoundResponse('Branch');
			return;
		}

		// Check name
		if (name && branch.name && name !== branch.name && (await exists({ name, college_id: branch.college_id.toString() }, Branch))) {
			ctx.body = ResponseHelper.generateResponse(403, `Branch with name ${name} already exists!`);
			return;
		}

		// Check if already updated
		if (!GeneralHelper.isSameUpdatedAt(branch.updated_at, updated_at)) {
			ctx.body = ResponseHelper.generateResponse(40399, 'Record has been updated by other user. ALL Data Changes are ABORTED. Please return to the function and try again.');
			return;
		}

		// update
		branch.name = name;
		await branch.save();

		ctx.body = ResponseHelper.generateResponse(200, 'Success', { branch });
	},
	getBranchStudents: async ctx => {
		const {
			id,
			page,
			limit
		} = ctx.params;
		const skip = limit * (page - 1);
		const { models } = ctx.custom;

		const Branch = models.branch;
		const BranchStudent = models.branch_student;

		// Check branch
		const branch = await Branch.findById(id);
		if (!branch) {
			ctx.body = ResponseHelper.generateNotFoundResponse('Branch');
			return;
		}

		const query = { branch_id: id };
		const total = await Branch.countDocuments(query);
		const branch_students = await BranchStudent.find(query)
			.limit(limit)
			.skip(skip)
			.populate('student_id')
			.lean();

		ctx.body = ResponseHelper.generateResponse(200, 'Success', {
			total,
			page,
			limit,
			count: branch_students.length,
			branch_students
		});
	},
	updateBranchStudents: async ctx => {
		const { id } = ctx.params;
		const { student_ids } = ctx.request.body;
		const { models } = ctx.custom;

		const Branch = models.branch;
		const BranchStudent = models.branch_student;

		// Check branch
		const branch = await Branch.findById(id);
		if (!branch) {
			ctx.body = ResponseHelper.generateNotFoundResponse('Branch');
			return;
		}

		// Remove all records first
		await BranchStudent.deleteMany({ branch_id: id });

		// Add students to branch
		const uniqStudentIds = _.uniq(student_ids); // unique student ids
		await Promise.all(
			uniqStudentIds.map(async sid => {
				const newBranchStudent = new BranchStudent();
				newBranchStudent.branch_id = id;
				newBranchStudent.student_id = sid;
				await newBranchStudent.save();
			})
		);

		ctx.body = ResponseHelper.generateResponse(200, 'Success');
	}
};
