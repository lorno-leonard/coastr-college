const _ = require('lodash');
const moment = require('moment');

const GeneralHelper = {
	generateRandomString(length = 20, digitOnly = false) {
		let text = '';
		let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

		if (digitOnly) {
			possible = '023456789';
		}

		for (let i = 0; i < length; i++) {
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		}

		return text;
	},
	isEmailValid(email) {
		const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	},
	isSameUpdatedAt: (updated_at_db, updated_at_client) => {
		const momentDb = moment(updated_at_db);
		const momentClient = moment(updated_at_client);

		return momentDb.toString() === momentClient.toString();
	}
};

module.exports = GeneralHelper;
