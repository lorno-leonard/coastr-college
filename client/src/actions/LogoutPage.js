import API from '../helpers/api';

export function logout() {
	return async dispatch => {
		const res = await API.auth.logout();
		localStorage.removeItem('college_admin');

		if (res.meta.code !== 200) {
			window.location.href = '/';
			return;
		}

		window.location.href = res.data.logout_url;
	};
}
