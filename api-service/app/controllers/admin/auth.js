const sha1 = require('sha1');

const config = require('../../../config');
const HeaderHelper = require('../../helpers/headers');
const ResponseHelper = require('../../helpers/response');
const ExistenseHelper = require('../../helpers/existence');
const AdminAuthHelper = require('../../helpers/admin_auth');

module.exports = {
	signup: async (ctx) => {
		const { email, password, name } = ctx.request.body;
		const { models } = ctx.custom;
		const { exists } = ExistenseHelper;

		const Admin = models.admin;

		// Check email
		if (await exists({ email }, Admin)) {
			ctx.body = ResponseHelper.generateResponse(403, `User with email ${email} already exists!`);
			return;
		}

		// create
		const admin = new Admin();
		admin.email = email;
		admin.password = sha1(password);
		admin.name = name;
		await admin.save();
		console.log({ admin });
		ctx.body = ResponseHelper.generateResponse(200, 'Success');
	},
	login: async (ctx) => {
		const { email, password } = ctx.request.body;
		const { models } = ctx.custom;

		const Admin = models.admin;
		const admin = await Admin.findOne({ email, password: sha1(password) });

		if (!admin) {
			ctx.body = ResponseHelper.generateResponse(401, 'Email or password is incorrect.');
			return;
		}

		// admin toObject
		const adminObject = admin.toObject();

		ctx.body = await AdminAuthHelper.handleSuccessfulAuth(ctx, adminObject);
	},
	logout: async (ctx) => {
		const { admin, redis } = ctx.custom;
		const authorizationToken = HeaderHelper.getBearerToken(ctx);

		await AdminAuthHelper.logout(redis, authorizationToken, admin);

		ctx.body = ResponseHelper.generateResponse(200, 'Success', {
			logout_url: config.auth.logout_url
		});
	}
};
