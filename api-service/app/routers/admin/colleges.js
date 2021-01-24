const Router = require('koa-router');
const appRoot = require('app-root-path');
const requireAll = require('require-all');

const controllers = requireAll(`${appRoot}/app/controllers`);
const middlewares = requireAll(`${appRoot}/app/middlewares`);

const router = new Router({
	prefix: '/admin/colleges'
});

router.use(middlewares.check_admin_token);

router.get('/', middlewares.ajv, controllers.admin.colleges.getColleges);
router.get('/:id', middlewares.ajv, controllers.admin.colleges.getCollegeById);
router.post('/', middlewares.ajv, controllers.admin.colleges.createCollege);
router.patch('/:id', middlewares.ajv, controllers.admin.colleges.updateCollegeById);

module.exports = router;
