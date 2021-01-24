const development = require('./environment/development');
const production = require('./environment/production');

const configs = {
	development,
	production
};

module.exports = configs[process.env.NODE_ENV] || configs.development;
