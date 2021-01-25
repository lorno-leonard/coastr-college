module.exports = {
	properties: {
		query: {
			type: 'object',
			properties: {
				// query options
				college_id: { type: 'string', minLength: 24, maxLength: 24 },

				page: { type: 'integer', default: 1 },
				limit: { type: 'integer', default: 10 }
			},
			additionalProperties: false
		}
	},
	additionalProperties: false
};
