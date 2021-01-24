module.exports = {
	properties: {
		body: {
			type: 'object',
			properties: {
				email: { type: 'string', format: 'email', transform: ['trim', 'toLowerCase'] }, // ajv-keywords' transform
				password: { type: 'string' },
				name: { type: 'string' }
			},
			required: [
				'email',
				'password',
				'name'
			],
			additionalProperties: false
		}
	},
	additionalProperties: false
};
