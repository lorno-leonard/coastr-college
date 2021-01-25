import request from './request';

export default {
	async getColleges(query) {
		const res = await request.get(`/admin/colleges`, query);
		return res;
	},
	async getCollegeById(id) {
		const res = await request.get(`/admin/colleges/${id}`);
		return res;
	},
	async creatCollege(body) {
		const res = await request.post(`/admin/colleges`, body);
		return res;
	},
	async updateCollegeById(id, body) {
		const res = await request.patch(`/admin/colleges/${id}`, body);
		return res;
	}
};
