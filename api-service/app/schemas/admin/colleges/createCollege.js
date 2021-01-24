module.exports = {
	properties: {
		body: {
			type: 'object',
			properties: {
				college: {
					type: 'object',
					properties: {
						name: { type: 'string' }
					},
					required: ['name'],
					additionalProperties: false
				}
			},
			required: ['college'],
			additionalProperties: false
		}
	},
	required: ['body'],
	additionalProperties: false
};
