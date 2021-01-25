import request from './request';

export default {
	async getStudents(query) {
		const res = await request.get(`/admin/students`, query);
		return res;
	},
	async getStudentById(id) {
		const res = await request.get(`/admin/students/${id}`);
		return res;
	},
	async creatStudent(body) {
		const res = await request.post(`/admin/students`, body);
		return res;
	},
	async updateStudentById(id, body) {
		const res = await request.patch(`/admin/students/${id}`, body);
		return res;
	}
};
