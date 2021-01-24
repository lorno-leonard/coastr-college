const _ = require('lodash');

const ResponseHelper = {
	// new ones
	generateNotFoundResponseString: objectName => {
		if (_.isNil(objectName)) {
			objectName = 'Object';
		}

		const { generateResponse } = ResponseHelper;
		const response = generateResponse(404, `${objectName} not found.`);
		return JSON.stringify(response);
	},

	generateErrorResponseString: (code, message = null) => {
		const { getErrorMessage, generateResponse } = ResponseHelper;
		if (_.isNil(message) || message === '') {
			message = getErrorMessage(code);
		}

		const response = generateResponse(code, message);
		return JSON.stringify(response);
	},

	generateResponseString: (code, message, data) => {
		const { generateResponse } = ResponseHelper;
		const response = generateResponse(code, message, data);
		return JSON.stringify(response);
	},

	// old ones
	generateResponse: (code, message, data) => {
		const response = { meta: { code, message }, data };
		if (_.isNil(data)) {
			delete response.data;
		}
		return response;
	},

	generateNotFoundResponse: name => ResponseHelper.generateResponse(404, `${name || 'Object'} not found`),

	generateErrorResponse: (code, message, data) => ResponseHelper.generateResponse(code, message || ResponseHelper.getErrorMessage(code), data),

	getErrorMessage: code => {
		switch (code) {
			case 403:
				return 'Unauthorized';
			case 404:
				return 'Resource not found';
			case 500:
				return 'Internal Server Error';
			default:
		}
		return '';
	}
};

module.exports = ResponseHelper;
