const _ = require('lodash');

const HeaderHelper = require('../helpers/headers');
const ResponseHelper = require('../helpers/response');
const Admin = require('../models/admin');

module.exports = async (ctx, next) => {
	const authorizationToken = HeaderHelper.getBearerToken(ctx);

	if (_.isNil(authorizationToken)) {
		ctx.body = ResponseHelper.generateResponse(403, 'Missing Bearer Token.');
		return;
	}

	const redisKey = `college_auth:admin:token:${authorizationToken}`;
	const adminString = await ctx.custom.redis.get(redisKey);
	if (_.isNil(adminString)) {
		ctx.body = ResponseHelper.generateResponse(403, 'Invalid Bearer Token.');
		return;
	}

	const jsonAdmin = JSON.parse(adminString);
	const dbAdmin = await Admin.findById(jsonAdmin._id);

	// Set admin to context
	_.set(ctx, 'custom.admin', dbAdmin);

	await next();
};
