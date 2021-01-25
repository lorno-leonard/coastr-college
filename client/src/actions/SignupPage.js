import * as ActionTypes from '../constants/ActionTypes';
import API from '../helpers/api';

export function onSubmit(fields){
	return async dispatch => {

		dispatch({
			type: ActionTypes.SUBMIT_SIGNUP_REQUEST,
			payload: {
				loadingSubmit: true,
				hasSignedUp: false
			}
		});

		const body = {
			...fields
		};
		const response = await API.auth.signup(body);

		if (response.meta.code !== 200) {
			dispatch({
				type: ActionTypes.SUBMIT_SIGNUP_ERROR,
				payload: {
					meta: response.meta,
					loadingSubmit: false
				}
			});
			return;
		}

		dispatch({
			type: ActionTypes.SUBMIT_SIGNUP_SUCCESS,
			payload: {
				meta: response.meta,
				hasSignedUp: true,
				loadingSubmit: false
			}
		});

	};
}

export function resetMeta() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_SIGNUP_PAGE_META
		});
	};
}

export function reset() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_SIGNUP_PAGE
		});
	};
}