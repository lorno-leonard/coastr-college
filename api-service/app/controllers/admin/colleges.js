const GeneralHelper = require('../../helpers/general');
const ResponseHelper = require('../../helpers/response');
const ExistenseHelper = require('../../helpers/existence');

module.exports = {
	getColleges: async ctx => {
		const { page, limit } = ctx.request.query;
		const skip = limit * (page - 1);
		const { models } = ctx.custom;

		// format query
		const query = {};

		const College = models.college;
		const total = await College.countDocuments(query);
		const colleges = await College.find(query)
			.limit(limit)
			.skip(skip)
			.sort({ name: 1 })
			.lean();

		ctx.body = ResponseHelper.generateResponse(200, 'Success', {
			total,
			page,
			limit,
			count: colleges.length,
			colleges
		});
	},
	getCollegeById: async ctx => {
		const { id } = ctx.params;
		const { models } = ctx.custom;

		const College = models.college;
		const college = await College.findById(id).lean();

		if (!college) {
			ctx.body = ResponseHelper.generateNotFoundResponse('College');
			return;
		}

		ctx.body = ResponseHelper.generateResponse(200, 'Success', { college });
	},
	createCollege: async ctx => {
		const { college: bodyCollege } = ctx.request.body;
		const { name } = bodyCollege;
		const { models } = ctx.custom;
		const { exists } = ExistenseHelper;

		const College = models.college;

		// Check name
		if (await exists({ name }, College)) {
			ctx.body = ResponseHelper.generateResponse(403, `College with name ${name} already exists!`);
			return;
		}

		// create
		const college = new College();
		college.name = name;
		await college.save();

		ctx.body = ResponseHelper.generateResponse(200, 'Success', { college });
	},
	updateCollegeById: async ctx => {
		const { id } = ctx.params;
		const { college: bodyCollege } = ctx.request.body;
		const { name, updated_at } = bodyCollege;
		const { models } = ctx.custom;
		const { exists } = ExistenseHelper;

		const College = models.college;

		// Check college
		const college = await College.findById(id);
		if (!college) {
			ctx.body = ResponseHelper.generateNotFoundResponse('College');
			return;
		}

		// Check name
		if (name && college.name && name !== college.name && (await exists({ name }, College))) {
			ctx.body = ResponseHelper.generateResponse(403, `College with name ${name} already exists!`);
			return;
		}

		// Check if already updated
		if (!GeneralHelper.isSameUpdatedAt(college.updated_at, updated_at)) {
			ctx.body = ResponseHelper.generateResponse(40399, 'Record has been updated by other user. ALL Data Changes are ABORTED. Please return to the function and try again.');
			return;
		}

		// update
		college.name = name;
		await college.save();

		ctx.body = ResponseHelper.generateResponse(200, 'Success', { college });
	}
};
