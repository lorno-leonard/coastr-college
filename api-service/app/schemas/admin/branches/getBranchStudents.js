module.exports = {
	properties: {
		params: {
			type: 'object',
			properties: {
				id: { type: 'string', minLength: 24, maxLength: 24 },

				page: { type: 'integer', default: 1 },
				limit: { type: 'integer', default: 10 }
			},
			required: ['id'],
			additionalProperties: false
		}
	},
	required: ['params'],
	additionalProperties: false
};
