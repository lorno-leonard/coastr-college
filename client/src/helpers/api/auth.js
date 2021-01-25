import request from './request';

export default {
	async signup({ name, email, password }) {
		const response = await request.post('/admin/auth/signup', {
			name,
			email,
			password
		});

		return response;
	},
	async login(email, password) {
		const response = await request.post('/admin/auth/login', {
			email,
			password
		});

		return response;
	},
	async logout() {
		const res = await request.post('/admin/auth/logout');
		return res;
	}
};
