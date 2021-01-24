const appRoot = require('app-root-path');
const requireAll = require('require-all');

const _ = require('lodash');
const Koa = require('koa');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const responseTime = require('koa-response-time');
const cors = require('@koa/cors');

const models = requireAll(`${appRoot}/app/models`);

// routers
const adminRouters = requireAll(`${appRoot}/app/routers/admin`);

const helpers = requireAll(`${appRoot}/app/helpers`);
const middlewares = requireAll(`${appRoot}/app/middlewares`);

const routerGroups = [adminRouters];
const app = new Koa();

app.context.custom = {
	models: {},
	helpers: {},
	redis: null
};

// models
_.each(models, (dependency, key) => {
	app.context.custom.models[key] = dependency;
});

// helpers
_.each(helpers, (dependency, key) => {
	app.context.custom.helpers[key] = dependency;
});

// middlewares
app.use(logger());
app.use(bodyParser({ jsonLimit: '30mb' }));
app.use(responseTime());
app.use(middlewares.error_handler);

app.use(cors());

// routes
_.each(routerGroups, (group) => {
	_.each(group, (router) => {
		app.use(router.routes());
	});
});

// not found routes
app.use(middlewares.route_not_found);

module.exports = app;
