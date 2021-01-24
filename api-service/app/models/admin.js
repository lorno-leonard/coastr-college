const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema(
	{
		email: { type: String, required: true },
		password: { type: String, required: true },
		name: { type: String, required: true }
	},
	{
		timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
		collection: 'admin',
		versionKey: false
	}
);

module.exports = mongoose.model('Admin', schema);
