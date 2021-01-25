const GeneralHelper = require('../../helpers/general');
const ResponseHelper = require('../../helpers/response');
const ExistenseHelper = require('../../helpers/existence');

module.exports = {
	getStudents: async ctx => {
		const { page, limit } = ctx.request.query;
		const skip = limit * (page - 1);
		const { models } = ctx.custom;

		// format query
		const query = {};

		const Student = models.student;
		const total = await Student.countDocuments(query);
		const students = await Student.find(query)
			.limit(limit)
			.skip(skip)
			.sort({ name: 1 })
			.lean();

		ctx.body = ResponseHelper.generateResponse(200, 'Success', {
			total,
			page,
			limit,
			count: students.length,
			students
		});
	},
	getStudentById: async ctx => {
		const { id } = ctx.params;
		const { models } = ctx.custom;

		const Student = models.student;
		const student = await Student.findById(id).lean();

		if (!student) {
			ctx.body = ResponseHelper.generateNotFoundResponse('Student');
			return;
		}

		ctx.body = ResponseHelper.generateResponse(200, 'Success', { student });
	},
	createStudent: async ctx => {
		const { student: bodyStudent } = ctx.request.body;
		const { name } = bodyStudent;
		const { models } = ctx.custom;
		const { exists } = ExistenseHelper;

		const Student = models.student;

		// Check name
		if (await exists({ name }, Student)) {
			ctx.body = ResponseHelper.generateResponse(403, `Student with name ${name} already exists!`);
			return;
		}

		// create
		const student = new Student();
		student.name = name;
		await student.save();

		ctx.body = ResponseHelper.generateResponse(200, 'Success', { student });
	},
	updateStudentById: async ctx => {
		const { id } = ctx.params;
		const { student: bodyStudent } = ctx.request.body;
		const { name, updated_at } = bodyStudent;
		const { models } = ctx.custom;
		const { exists } = ExistenseHelper;

		const Student = models.student;

		// Check student
		const student = await Student.findById(id);
		if (!student) {
			ctx.body = ResponseHelper.generateNotFoundResponse('Student');
			return;
		}

		// Check name
		if (name && student.name && name !== student.name && (await exists({ name }, Student))) {
			ctx.body = ResponseHelper.generateResponse(403, `Student with name ${name} already exists!`);
			return;
		}

		// Check if already updated
		if (!GeneralHelper.isSameUpdatedAt(student.updated_at, updated_at)) {
			ctx.body = ResponseHelper.generateResponse(40399, 'Record has been updated by other user. ALL Data Changes are ABORTED. Please return to the function and try again.');
			return;
		}

		// update
		student.name = name;
		await student.save();

		ctx.body = ResponseHelper.generateResponse(200, 'Success', { student });
	}
};
