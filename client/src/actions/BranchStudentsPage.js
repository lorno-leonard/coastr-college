import * as ActionTypes from '../constants/ActionTypes';
import API from '../helpers/api';

export function getBranchStudents(id) {
	return async dispatch => {

		dispatch({
			type: ActionTypes.GET_BRANCH_STUDENTS_BRANCH_REQUEST,
			payload: {
				loading: true,
				hasLoaded: false
			}
		});

		const response = await API.branches.getBranchStudents(id);

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_BRANCH_STUDENTS_BRANCH_ERROR,
				payload: {
					meta: response.meta,
					loading: false
				}
			});
		}

		const { students } = response.data;

		dispatch({
			type: ActionTypes.GET_BRANCH_STUDENTS_BRANCH_SUCCESS,
			payload: {
				branch_students: students,
				loading: false,
				hasLoaded: true
			}
		});
	};
}

export function getStudents() {
	return async dispatch => {

		dispatch({
			type: ActionTypes.GET_BRANCH_STUDENTS_BRANCH_REQUEST,
			payload: {
				loadingStudents: true
			}
		});

		const response = await API.students.getStudents({
			page: 1,
			limit: 99999
		});

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_BRANCH_STUDENTS_BRANCH_ERROR,
				payload: {
					meta: response.meta,
					loadingStudents: false
				}
			});
		}

		const { students } = response.data;

		dispatch({
			type: ActionTypes.GET_BRANCH_STUDENTS_BRANCH_SUCCESS,
			payload: {
				students,
				loadingStudents: false
			}
		});
	};
}

export function getBranchById(id) {
	return async dispatch => {

		dispatch({
			type: ActionTypes.GET_BRANCH_STUDENTS_BRANCH_REQUEST,
			payload: {
				loadingBranch: true
			}
		});

		const response = await API.branches.getBranchById(id);

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_BRANCH_STUDENTS_BRANCH_ERROR,
				payload: {
					meta: response.meta,
					loadingBranch: false
				}
			});
		}

		const { branch } = response.data;

		dispatch({
			type: ActionTypes.GET_BRANCH_STUDENTS_BRANCH_SUCCESS,
			payload: {
				branch,
				loadingBranch: false
			}
		});
	};
}

export function onSubmit(fields){
	return async (dispatch, getState) => {
		const { branch } = getState().BranchStudentsPage;

		dispatch({
			type: ActionTypes.SUBMIT_BRANCH_STUDENTS_REQUEST,
			payload: {
				loadingSubmit: true
			}
		});

		const body = {
			...fields
		};
		const response = await API.branches.updateBranchStudents(branch._id, body);

		if (response.meta.code !== 200) {
			dispatch({
				type: ActionTypes.SUBMIT_BRANCH_STUDENTS_ERROR,
				payload: {
					meta: response.meta,
					loadingSubmit: false
				}
			});
			return;
		}

		dispatch({
			type: ActionTypes.SUBMIT_BRANCH_STUDENTS_SUCCESS,
			payload: {
				meta: response.meta,
				loadingSubmit: false
			}
		});
	};
}

export function resetMeta() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_BRANCH_STUDENTS_META
		});
	};
}

export function reset() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_BRANCH_STUDENTS
		});
	};
}