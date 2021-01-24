const TOKEN_TTL = 86400;

const AdminAuthHelper = {
	handleSuccessfulAuth: async (ctx, admin) => {
		const { redis, helpers } = ctx.custom;
		const { generateRandomString } = helpers.general;
		const { generateResponse } = helpers.response;

		// Step 1: Create token
		const token = generateRandomString();

		// Step 2: Save token to redis
		const key = `college_auth:admin:token:${token}`;
		await redis.set(key, JSON.stringify(admin));
		await redis.expire(key, TOKEN_TTL);
		await redis.sadd(`college_auth:admin:${admin._id}`, token);

		// Step 3: Return token and admin
		const data = {
			auth: {
				token
			},
			admin
		};
		return generateResponse(200, 'Authentication successful', data);
	},

	logout: async (redis, token, admin) => {
		const set = `college_auth:admin:${admin._id}`;
		const key = `college_auth:admin:token:${token}`;

		await redis.srem(set, token);
		await redis.del(key);
	}
};

module.exports = AdminAuthHelper;
