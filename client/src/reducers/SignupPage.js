import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
	hasSignedUp: false,
	loadingSubmit: false
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case ActionTypes.SUBMIT_SIGNUP_REQUEST:
		case ActionTypes.SUBMIT_SIGNUP_SUCCESS:
		case ActionTypes.SUBMIT_SIGNUP_ERROR:
			return {
				...state,
				...action.payload
			};
		case ActionTypes.RESET_SIGNUP_PAGE_META:
			return {
				...state,
				meta: null
			};
		case ActionTypes.RESET_SIGNUP_PAGE:
			return {
				...initialState
			};
		default:
			return state;
	}
}
