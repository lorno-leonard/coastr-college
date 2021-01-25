module.exports = {
	properties: {
		params: {
			type: 'object',
			properties: {
				id: { type: 'string', minLength: 24, maxLength: 24 }
			},
			required: ['id'],
			additionalProperties: false
		},
		body: {
			type: 'object',
			properties: {
				student: {
					type: 'object',
					properties: {
						name: { type: 'string' },
						updated_at: { type: 'string' }
					},
					required: [
						'name',
						'updated_at'
					],
					additionalProperties: false
				}
			},
			required: ['student'],
			additionalProperties: false
		}
	},
	required: ['params', 'body'],
	additionalProperties: false
};
