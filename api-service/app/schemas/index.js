const appRoot = require('app-root-path');
const requireAll = require('require-all');

const schemas = requireAll(`${appRoot}/app/schemas`);

module.exports = {
	/* ADMIN ROUTES */
	// /admin/auth
	'POST /admin/auth/signup': schemas.admin.auth.signup,
	'POST /admin/auth/login': schemas.admin.auth.login,
	'POST /admin/auth/logout': schemas.admin.auth.logout,

	// /admin/colleges
	'GET /admin/colleges': schemas.admin.colleges.getColleges,
	'GET /admin/colleges/:id': schemas.admin.colleges.getCollegeById,
	'POST /admin/colleges': schemas.admin.colleges.createCollege,
	'PATCH /admin/colleges/:id': schemas.admin.colleges.updateCollegeById,

	// /admin/branches
	'GET /admin/branches': schemas.admin.branches.getBranches,
	'GET /admin/branches/:id': schemas.admin.branches.getBranchById,
	'POST /admin/branches': schemas.admin.branches.createBranch,
	'PATCH /admin/branches/:id': schemas.admin.branches.updateBranchById,

	// /admin/students
	'GET /admin/students': schemas.admin.students.getStudents,
	'GET /admin/students/:id': schemas.admin.students.getStudentById,
	'POST /admin/students': schemas.admin.students.createStudent,
	'PATCH /admin/students/:id': schemas.admin.students.updateStudentById
};
