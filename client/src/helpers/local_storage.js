const LocalStorageHelper = {
	getUsername() {
		try {
			const admin = JSON.parse(localStorage.getItem('college_admin'));
			return admin.admin.name;
		} catch (e) { }
		return '';
	}
};

export default LocalStorageHelper;
