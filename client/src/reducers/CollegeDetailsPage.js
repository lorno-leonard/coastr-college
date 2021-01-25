import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
	loading: false,
	restaurant: null,
	loadingSubmit: false
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case ActionTypes.GET_COLLEGE_BASIC_REQUEST:
		case ActionTypes.GET_COLLEGE_BASIC_SUCCESS:
		case ActionTypes.GET_COLLEGE_BASIC_ERROR:
		case ActionTypes.SUBMIT_COLLEGE_DETAIL_REQUEST:
		case ActionTypes.SUBMIT_COLLEGE_DETAIL_SUCCESS:
		case ActionTypes.SUBMIT_COLLEGE_DETAIL_ERROR:
			return {
				...state,
				...action.payload
			};
		case ActionTypes.RESET_COLLEGE_BASIC_META:
			return {
				...state,
				meta: null
			};
		case ActionTypes.RESET_COLLEGE_BASIC:
			return {
				...initialState
			};
		default:
			return state;
	}
}
