import request from './request';

export default {
	async getBranches(query) {
		const res = await request.get(`/admin/branches`, query);
		return res;
	},
	async getBranchById(id) {
		const res = await request.get(`/admin/branches/${id}`);
		return res;
	},
	async createBranch(body) {
		const res = await request.post(`/admin/branches`, body);
		return res;
	},
	async updateBranchById(id, body) {
		const res = await request.patch(`/admin/branches/${id}`, body);
		return res;
	},
	async getBranchStudents(id) {
		const res = await request.get(`/admin/branches/${id}/students`);
		return res;
	},
	async updateBranchStudents(id, body) {
		const res = await request.patch(`/admin/branches/${id}/students`, body);
		return res;
	}
};
