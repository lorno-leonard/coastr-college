import superagent from 'superagent';
import config from '../../config';

const getToken = () => localStorage.getItem('college_admin')
	? JSON.parse(localStorage.getItem('college_admin')).token
	: '';

export default {
	get(url, query = {}) {
		return new Promise(function (resolve, reject) {
			superagent
				.get(`${config.api}${url}`)
				.set('Accept', 'application/json')
				.set('Content-Type', 'application/json')
				.set('Authorization', `Bearer ${getToken()}`)
				.query(query)
				.end((error, result) => {
					if (error) {
						return reject({
							error: error,
							result: result
						});
					}
					resolve(result.body);
				});
		});
	},
	post(url, body = {}) {
		return new Promise(function (resolve, reject) {
			superagent
				.post(`${config.api}${url}`)
				.set('Accept', 'application/json')
				.set('Content-Type', 'application/json')
				.set('Authorization', `Bearer ${getToken()}`)
				.send(body)
				.end((error, result) => {
					if (error) {
						return reject({
							error: error,
							result: result
						});
					}
					resolve(result.body);
				});
		});
	},
	patch(url, body = {}) {
		return new Promise(function (resolve, reject) {
			superagent
				.patch(`${config.api}${url}`)
				.set('Accept', 'application/json')
				.set('Content-Type', 'application/json')
				.set('Authorization', `Bearer ${getToken()}`)
				.send(body)
				.end((error, result) => {
					if (error) {
						return reject({
							error: error,
							result: result
						});
					}
					resolve(result.body);
				});
		});
	},
	delete(url, query = {}) {
		return new Promise(function (resolve, reject) {
			superagent
				.del(`${config.api}${url}`)
				.set('Accept', 'application/json')
				.set('Content-Type', 'application/json')
				.set('Authorization', `Bearer ${getToken()}`)
				.query(query)
				.end((error, result) => {
					if (error) {
						return reject({
							error: error,
							result: result
						});
					}
					resolve(result.body);
				});
		});
	}
};
