const appRoot = require('app-root-path');
const requireAll = require('require-all');

const bin = requireAll(`${appRoot}/bin`, { recursive: true });
const { app, init } = bin;
const port = 4000;

const initialize = async () => {
	try {
		console.log('[!] Starting server');

		app.context.custom.redis = init.redis();
		console.log('[!] Redis initialized');

		await init.mongo();
		console.log('[!] MongoDB initialized');

		app.listen(port);
		console.log('[!] Server started at port:', port);
	} catch (e) {
		throw e;
	}
};

initialize();
