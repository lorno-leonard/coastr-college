import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
	loading: false,
	branches: [],
	total: 0,
	page: null,
	limit: null,
	count: 0,

	loadingColleges: false,
	hasLoadedColleges: false,
	colleges: []
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case ActionTypes.GET_BRANCHES_PAGE_REQUEST:
		case ActionTypes.GET_BRANCHES_PAGE_SUCCESS:
		case ActionTypes.GET_BRANCHES_PAGE_ERROR:
		case ActionTypes.GET_BRANCHES_PAGE_COLLEGES_REQUEST:
		case ActionTypes.GET_BRANCHES_PAGE_COLLEGES_SUCCESS:
		case ActionTypes.GET_BRANCHES_PAGE_COLLEGES_ERROR:
			return {
				...state,
				...action.payload
			};
		case ActionTypes.RESET_BRANCHES_PAGE_META:
			return {
				...state,
				meta: null
			};
		case ActionTypes.RESET_BRANCHES_PAGE:
			return {
				...initialState
			};
		default:
			return state;
	}
}
