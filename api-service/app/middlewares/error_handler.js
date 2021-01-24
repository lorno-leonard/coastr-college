module.exports = async (ctx, next) => {
	const { generateErrorResponse } = ctx.custom.helpers.response;

	try {
		await next();
	} catch (e) {
		console.error('[!] ===================== [!]');
		console.error('[!] Internal Server Error [!]');
		console.error(e);
		console.error('[!] ===================== [!]');
		console.error(e.stack);
		console.error('[!] ===================== [!]');

		ctx.body = generateErrorResponse(500, `Internal server error - ${e.toString()}`);
	}
};
