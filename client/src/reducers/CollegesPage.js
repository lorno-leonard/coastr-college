import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
	loading: false,
	colleges: [],
	total: 0,
	page: null,
	limit: null,
	count: 0
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case ActionTypes.GET_COLLEGES_PAGE_REQUEST:
		case ActionTypes.GET_COLLEGES_PAGE_SUCCESS:
		case ActionTypes.GET_COLLEGES_PAGE_ERROR:
			return {
				...state,
				...action.payload
			};
		case ActionTypes.RESET_COLLEGES_PAGE_META:
			return {
				...state,
				meta: null
			};
		case ActionTypes.RESET_COLLEGES_PAGE:
			return {
				...initialState
			};
		default:
			return state;
	}
}
