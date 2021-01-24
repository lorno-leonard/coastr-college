module.exports = async ctx => {
	const { generateErrorResponse } = ctx.custom.helpers.response;
	ctx.body = generateErrorResponse(404, 'Route does not exist');
};
