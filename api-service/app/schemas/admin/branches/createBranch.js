module.exports = {
	properties: {
		body: {
			type: 'object',
			properties: {
				branch: {
					type: 'object',
					properties: {
						college_id: { type: 'string', minLength: 24, maxLength: 24 },
						name: { type: 'string' }
					},
					required: [
						'college_id',
						'name'
					],
					additionalProperties: false
				}
			},
			required: ['branch'],
			additionalProperties: false
		}
	},
	required: ['body'],
	additionalProperties: false
};
