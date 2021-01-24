const Ajv = require('ajv');
const appRoot = require('app-root-path');
const AjvKeywords = require('ajv-keywords');

const requestSchema = require(`${appRoot}/app/schemas`);

function formatMatchedRoute(route) {
	if (route.substring(route.length - 1) === '/') {
		return route.substring(0, route.length - 1);
	}
	return route;
}

module.exports = async (ctx, next) => {
	const { generateErrorResponse } = ctx.custom.helpers.response;

	// find for the schema
	const matchedRoute = formatMatchedRoute(ctx._matchedRoute);
	const schemaKey = `${ctx.request.method} ${matchedRoute}`;
	const schema = requestSchema[schemaKey];

	// initialize ajv
	const ajv = new Ajv({
		removeAdditional: true,
		useDefaults: true,
		coerceTypes: true
	});

	// Use ajv-keywords
	AjvKeywords(ajv, ['transform']); // add more keywords if needed: https://github.com/epoberezkin/ajv-keywords

	const data = {
		params: ctx.params,
		query: ctx.request.query,
		body: ctx.request.body
	};

	// validate data
	const validate = ajv.compile(schema);
	const valid = validate(data);

	if (!valid) {
		console.error('[!] Schema validation error [!]');
		console.error('[!] ======================= [!]');
		console.error('data => ', data);
		console.error(validate.errors);
		console.error('[!] ======================= [!]');

		ctx.body = generateErrorResponse(4034, 'Schema validation error', { errors: validate.errors });
		return;
	}

	await next();
};
