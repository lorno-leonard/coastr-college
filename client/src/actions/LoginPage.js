import { push } from 'connected-react-router';
import moment from 'moment';
import * as ActionTypes from '../constants/ActionTypes';
import API from '../helpers/api';

export function showLoginForm({ path }) {
	return async dispatch => {
		dispatch({
			type: ActionTypes.LOGIN_PAGE_SHOW_LOGIN_FORM
		});
	};
}

export function onFieldChange(fieldName, fieldValue) {
	return async dispatch => {
		dispatch({
			type: ActionTypes.UPDATE_LOGIN_PAGE_FORM_FIELD,
			payload: {
				fieldName,
				fieldValue
			}
		});
	};
}

export function login({ email, password, query }) {
	return async dispatch => {
		dispatch({
			type: ActionTypes.LOGIN_REQUEST
		});

		const response = await API.auth.login(email, password);

		if (response.meta.code !== 200) {
			dispatch({
				type: ActionTypes.LOGIN_ERROR,
				payload: {
					error: response.meta.message
				}
			});
			return;
		}

		dispatch({
			type: ActionTypes.LOGIN_SUCCESS
		});

		// store response
		localStorage.setItem('college_admin', JSON.stringify({
			token: response.data.auth.token,
			admin: response.data.admin,
			last_login: moment()
		}));

		if (query && query.path && query.path !== '/' && query.path !== '') {
			dispatch(push(query.path));
			return;
		}

		// Navigate to next page
		dispatch(push('/colleges'));
	};
}

export function reset() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_LOGIN_PAGE
		});
	};
}
