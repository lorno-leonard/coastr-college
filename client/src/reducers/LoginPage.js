import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
	showLoginForm: false,

	loading: false,
	email: '',
	password: '',
	error: ''
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case ActionTypes.LOGIN_PAGE_SHOW_LOGIN_FORM:
			return {
				...state,
				showLoginForm: true
			};
		case ActionTypes.UPDATE_LOGIN_PAGE_FORM_FIELD:
			return {
				...state,
				[action.payload.fieldName]: action.payload.fieldValue
			};
		case ActionTypes.LOGIN_REQUEST:
			return {
				...state,
				loading: true,
				error: ''
			};
		case ActionTypes.LOGIN_SUCCESS:
			return {
				...state,
				password: '',
				error: ''
			};
		case ActionTypes.LOGIN_ERROR:
			return {
				...state,
				error: action.payload.error,
				password: '',
				loading: false
			};
		case ActionTypes.RESET_LOGIN_PAGE:
			return {
				...initialState
			};
		default:
			return state;
	}
}
