module.exports = {
	auth: {
		logout_url: 'http://localhost:4100'
	},
	college_app: {
		host: 'http://localhost:4100'
	},
	college_api: {
		host: 'http://localhost:4000',
		mongodb: {
			main: 'mongodb://localhost:4001/college_development'
		},
		redis: {
			host: 'localhost',
			port: '4002',
			db: 0
		}
	}
};
