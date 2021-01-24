const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema(
	{
		name: { type: String, required: true }
	},
	{
		timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
		collection: 'student',
		versionKey: false
	}
);

module.exports = mongoose.model('Student', schema);
