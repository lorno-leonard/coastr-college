const LabelHelper = {
	casUserType(casUserType) {
		switch (casUserType) {
			case 'staff':
				return 'Staff';
			case 'undergrad':
				return 'Undergraduate';
			case 'postgrad':
				return 'Postgraduate';
			case 'department':
				return 'Department';
			case 'emeritus':
				return 'Emeritus';
			case 'project':
				return 'Project';
			case 'family-google':
				return 'Family (Google Login)';
			default:
		}
		return '';
	},
	restaurantStatus(status) {
		switch (status) {
			case 'active':
				return 'Active';
			case 'inactive':
				return 'Inactive';
			default:
		}
		return '';
	},
	inspectorFormStatus(status) {
		switch (status) {
			case 'active':
				return 'Active';
			case 'inactive':
				return 'Inactive';
			default:
		}
		return '';
	},
	reportStatus(status) {
		switch (status) {
			case 'draft':
				return 'Draft';
			case 'created':
				return 'Incomplete';
			case 'resolved':
				return 'Completed';
			default:
		}
		return '';
	},
	reportItemStatus(status) {
		switch (status) {
			case 'draft':
				return 'Draft';
			case 'created':
				return 'Pending';
			case 'resolved':
				return 'Resolved';
			default:
		}
		return '';
	}
};

export default LabelHelper;
