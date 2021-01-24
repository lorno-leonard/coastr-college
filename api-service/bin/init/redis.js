const appRoot = require('app-root-path');
const Redis = require('ioredis');

const config = require(`${appRoot}/config`);

module.exports = () => {
	const redisHost = config.college_api.redis;
	return new Redis(redisHost);
};
