const appRoot = require('app-root-path');
const mongoose = require('mongoose');

const config = require(`${appRoot}/config`);

module.exports = async () => {
	const mongodbHost = config.college_api.mongodb.main;
	await mongoose.connect(mongodbHost, {
		useNewUrlParser: true,
		useFindAndModify: false,
		autoIndex: true,
		useUnifiedTopology: true
	});
};
