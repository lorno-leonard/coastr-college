module.exports = {
	properties: {
		body: {
			type: 'object',
			properties: {
				student: {
					type: 'object',
					properties: {
						name: { type: 'string' }
					},
					required: ['name'],
					additionalProperties: false
				}
			},
			required: ['student'],
			additionalProperties: false
		}
	},
	required: ['body'],
	additionalProperties: false
};
