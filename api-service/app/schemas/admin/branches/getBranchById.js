module.exports = {
	properties: {
		params: {
			type: 'object',
			properties: {
				id: { type: 'string', minLength: 24, maxLength: 24 }
			},
			required: ['id'],
			additionalProperties: false
		}
	},
	required: ['params'],
	additionalProperties: false
};
