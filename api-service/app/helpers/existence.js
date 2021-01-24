module.exports = {
	exists: async (field, Model) => {
		const existing = await Model.findOne(field);
		return !!existing;
	}
};
