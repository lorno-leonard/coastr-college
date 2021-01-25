import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
	loading: false,
	branch: null,
	loadingSubmit: false,

	loadingColleges: false,
	hasLoadedColleges: false,
	colleges: []
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case ActionTypes.GET_BRANCH_BASIC_REQUEST:
		case ActionTypes.GET_BRANCH_BASIC_SUCCESS:
		case ActionTypes.GET_BRANCH_BASIC_ERROR:
		case ActionTypes.GET_BRANCH_BASIC_COLLEGES_REQUEST:
		case ActionTypes.GET_BRANCH_BASIC_COLLEGES_SUCCESS:
		case ActionTypes.GET_BRANCH_BASIC_COLLEGES_ERROR:
		case ActionTypes.SUBMIT_BRANCH_DETAIL_REQUEST:
		case ActionTypes.SUBMIT_BRANCH_DETAIL_SUCCESS:
		case ActionTypes.SUBMIT_BRANCH_DETAIL_ERROR:
			return {
				...state,
				...action.payload
			};
		case ActionTypes.RESET_BRANCH_BASIC_META:
			return {
				...state,
				meta: null
			};
		case ActionTypes.RESET_BRANCH_BASIC:
			return {
				...initialState
			};
		default:
			return state;
	}
}
