const _ = require('lodash');

module.exports = {
	getBearerToken(ctx) {
		const { headers } = ctx.request;
		if (_.isNil(headers.authorization)) {
			return null;
		}

		const auth = headers.authorization;
		const parts = auth.split(' ');
		if (parts.length < 2) {
			return null;
		}

		const schema = _.get(parts, '[0]', '').toLowerCase();
		if (schema !== 'bearer') {
			return null;
		}

		return parts.slice(1).join(' ');
	}
};
