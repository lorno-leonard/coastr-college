const Router = require('koa-router');
const appRoot = require('app-root-path');
const requireAll = require('require-all');

const controllers = requireAll(`${appRoot}/app/controllers`);
const middlewares = requireAll(`${appRoot}/app/middlewares`);

const router = new Router({
	prefix: '/admin/auth'
});

router.post('/signup', middlewares.ajv, controllers.admin.auth.signup);
router.post('/login', middlewares.ajv, controllers.admin.auth.login);
router.post('/logout', middlewares.ajv, middlewares.check_admin_token, controllers.admin.auth.logout);

module.exports = router;
