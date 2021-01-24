module.exports = {
	properties: {
		body: {
			type: 'object',
			properties: {
				email: { type: 'string', format: 'email', transform: ['trim', 'toLowerCase'] }, // ajv-keywords' transform
				password: { type: 'string' }
			},
			required: ['email', 'password'],
			additionalProperties: false
		}
	},
	additionalProperties: false
};
