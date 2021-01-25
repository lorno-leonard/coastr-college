import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
	loading: false,
	student: null,
	loadingSubmit: false
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case ActionTypes.GET_STUDENT_BASIC_REQUEST:
		case ActionTypes.GET_STUDENT_BASIC_SUCCESS:
		case ActionTypes.GET_STUDENT_BASIC_ERROR:
		case ActionTypes.SUBMIT_STUDENT_DETAIL_REQUEST:
		case ActionTypes.SUBMIT_STUDENT_DETAIL_SUCCESS:
		case ActionTypes.SUBMIT_STUDENT_DETAIL_ERROR:
			return {
				...state,
				...action.payload
			};
		case ActionTypes.RESET_STUDENT_BASIC_META:
			return {
				...state,
				meta: null
			};
		case ActionTypes.RESET_STUDENT_BASIC:
			return {
				...initialState
			};
		default:
			return state;
	}
}
