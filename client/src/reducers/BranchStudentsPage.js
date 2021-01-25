import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
	loading: false,
	hasLoaded: false,
	branch_students: null,
	loadingSubmit: false,

	loadingStudents: false,
	students: [],

	loadingBranch: false,
	branch: null
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case ActionTypes.GET_BRANCH_STUDENTS_REQUEST:
		case ActionTypes.GET_BRANCH_STUDENTS_SUCCESS:
		case ActionTypes.GET_BRANCH_STUDENTS_ERROR:
		case ActionTypes.GET_BRANCH_STUDENTS_LIST_REQUEST:
		case ActionTypes.GET_BRANCH_STUDENTS_LIST_SUCCESS:
		case ActionTypes.GET_BRANCH_STUDENTS_LIST_ERROR:
		case ActionTypes.GET_BRANCH_STUDENTS_BRANCH_REQUEST:
		case ActionTypes.GET_BRANCH_STUDENTS_BRANCH_SUCCESS:
		case ActionTypes.GET_BRANCH_STUDENTS_BRANCH_ERROR:
		case ActionTypes.SUBMIT_BRANCH_STUDENTS_REQUEST:
		case ActionTypes.SUBMIT_BRANCH_STUDENTS_SUCCESS:
		case ActionTypes.SUBMIT_BRANCH_STUDENTS_ERROR:
			return {
				...state,
				...action.payload
			};
		case ActionTypes.RESET_BRANCH_STUDENTS_META:
			return {
				...state,
				meta: null
			};
		case ActionTypes.RESET_BRANCH_STUDENTS:
			return {
				...initialState
			};
		default:
			return state;
	}
}
