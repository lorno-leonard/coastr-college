module.exports = {
	properties: {
		body: {
			type: 'object',
			properties: {
				student_ids: {
					type: 'array',
					items: { type: 'string', minLength: 24, maxLength: 24 }
				}
			},
			required: ['student_ids'],
			additionalProperties: false
		}
	},
	required: ['body'],
	additionalProperties: false
};
