module.exports = {
	auth: {
		logout_url: 'http://localhost:4100'
	},
	college_app: {
		host: 'http://localhost:4100'
	},
	college_api: {
		host: 'http://0.0.0.0:4000',
		mongodb: {
			main: 'mongodb://coastr-college-mongo:27017/college_production'
		},
		redis: {
			host: 'coastr-college-redis',
			port: '6379',
			db: 1
		}
	}
};
