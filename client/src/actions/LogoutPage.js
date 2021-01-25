import API from '../helpers/api';

export function logout() {
	return async dispatch => {
		const res = await API.auth.logout();
		if (res.meta.code !== 200) {
			return;
		}
		localStorage.removeItem('college_admin');
		window.location.href = res.data.logout_url;
	};
}
