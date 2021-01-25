const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema(
	{
		college_id: { type: Schema.Types.ObjectId, ref: 'College', required: true },
		name: { type: String, required: true }

	},
	{
		timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
		collection: 'branch',
		versionKey: false
	}
);

module.exports = mongoose.model('Branch', schema);
