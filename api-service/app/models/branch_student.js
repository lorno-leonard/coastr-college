const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema(
	{
		branch_id: { type: Schema.Types.ObjectId, ref: 'Branch', required: true },
		student_id: { type: Schema.Types.ObjectId, ref: 'Student', required: true }
	},
	{
		timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
		collection: 'branch_student',
		versionKey: false
	}
);

module.exports = mongoose.model('BranchStudent', schema);
