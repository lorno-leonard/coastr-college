import { push } from 'connected-react-router';
import * as ActionTypes from '../constants/ActionTypes';
import API from '../helpers/api';

export function getStudentById(id) {
	return async dispatch => {

		dispatch({
			type: ActionTypes.GET_STUDENT_BASIC_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.students.getStudentById(id);

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_STUDENT_BASIC_ERROR,
				payload: {
					meta: response.meta,
					loading: false
				}
			});
		}

		const { student } = response.data;

		dispatch({
			type: ActionTypes.GET_STUDENT_BASIC_SUCCESS,
			payload: {
				student,
				loading: false
			}
		});
	};
}

export function onSubmit(fields){
	return async (dispatch, getState) => {
		const { student } = getState().StudentDetailsPage;

		dispatch({
			type: ActionTypes.SUBMIT_STUDENT_DETAIL_REQUEST,
			payload: {
				loadingSubmit: true
			}
		});

		const body = {
			student: {
				...fields
			}
		};

		let response;
		if (student) {
			body.student.updated_at = fields.updated_at;
			response = await API.students.updateStudentById(student._id, body);
		} else {
			response = await API.students.createStudent(body);
		}

		if (response.meta.code !== 200) {
			dispatch({
				type: ActionTypes.SUBMIT_STUDENT_DETAIL_ERROR,
				payload: {
					meta: response.meta,
					loadingSubmit: false
				}
			});
			return;
		}

		const { student: newStudent } = response.data;

		dispatch({
			type: ActionTypes.SUBMIT_STUDENT_DETAIL_SUCCESS,
			payload: {
				meta: response.meta,
				student: newStudent,
				loadingSubmit: false
			}
		});
		if (!student) {
			dispatch(push(`/students/id/basic?id=${newStudent._id}`));
		}

	};
}

export function resetMeta() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_STUDENT_BASIC_META
		});
	};
}

export function reset() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_STUDENT_BASIC
		});
	};
}