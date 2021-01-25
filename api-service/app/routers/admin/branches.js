const Router = require('koa-router');
const appRoot = require('app-root-path');
const requireAll = require('require-all');

const controllers = requireAll(`${appRoot}/app/controllers`);
const middlewares = requireAll(`${appRoot}/app/middlewares`);

const router = new Router({
	prefix: '/admin/branches'
});

router.use(middlewares.check_admin_token);

router.get('/', middlewares.ajv, controllers.admin.branches.getBranches);
router.get('/:id', middlewares.ajv, controllers.admin.branches.getBranchById);
router.post('/', middlewares.ajv, controllers.admin.branches.createBranch);
router.patch('/:id', middlewares.ajv, controllers.admin.branches.updateBranchById);

module.exports = router;
