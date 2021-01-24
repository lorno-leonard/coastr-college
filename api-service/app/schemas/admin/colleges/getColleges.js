module.exports = {
	properties: {
		query: {
			type: 'object',
			properties: {
				page: { type: 'integer', default: 1 },
				limit: { type: 'integer', default: 10 }
			},
			additionalProperties: false
		}
	},
	additionalProperties: false
};
