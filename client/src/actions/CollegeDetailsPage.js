import { push } from 'connected-react-router';
import * as ActionTypes from '../constants/ActionTypes';
import API from '../helpers/api';

export function getCollegeById(id) {
	return async dispatch => {

		dispatch({
			type: ActionTypes.GET_COLLEGE_BASIC_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.colleges.getCollegeById(id);

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_COLLEGE_BASIC_ERROR,
				payload: {
					meta: response.meta,
					loading: false
				}
			});
		}

		const { college } = response.data;

		dispatch({
			type: ActionTypes.GET_COLLEGE_BASIC_SUCCESS,
			payload: {
				college,
				loading: false
			}
		});
	};
}

export function onSubmit(fields){
	return async (dispatch, getState) => {
		const { college } = getState().CollegeDetailsPage;

		dispatch({
			type: ActionTypes.SUBMIT_COLLEGE_DETAIL_REQUEST,
			payload: {
				loadingSubmit: true
			}
		});

		const body = {
			college: {
				...fields
			}
		};

		let response;
		if (college) {
			body.college.updated_at = fields.updated_at;
			response = await API.colleges.updateCollegeById(college._id, body);
		} else {
			response = await API.colleges.creatCollege(body);
		}

		if (response.meta.code !== 200) {
			dispatch({
				type: ActionTypes.SUBMIT_COLLEGE_DETAIL_ERROR,
				payload: {
					meta: response.meta,
					loadingSubmit: false
				}
			});
			return;
		}

		const { college: newCollege } = response.data;

		dispatch({
			type: ActionTypes.SUBMIT_COLLEGE_DETAIL_SUCCESS,
			payload: {
				meta: response.meta,
				college: newCollege,
				loadingSubmit: false
			}
		});
		if (!college) {
			dispatch(push(`/colleges/id/basic?id=${newCollege._id}`));
		}

	};
}

export function resetMeta() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_COLLEGE_BASIC_META
		});
	};
}

export function reset() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_COLLEGE_BASIC
		});
	};
}