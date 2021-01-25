const Router = require('koa-router');
const appRoot = require('app-root-path');
const requireAll = require('require-all');

const controllers = requireAll(`${appRoot}/app/controllers`);
const middlewares = requireAll(`${appRoot}/app/middlewares`);

const router = new Router({
	prefix: '/admin/students'
});

router.use(middlewares.check_admin_token);

router.get('/', middlewares.ajv, controllers.admin.students.getStudents);
router.get('/:id', middlewares.ajv, controllers.admin.students.getStudentById);
router.post('/', middlewares.ajv, controllers.admin.students.createStudent);
router.patch('/:id', middlewares.ajv, controllers.admin.students.updateStudentById);

module.exports = router;
