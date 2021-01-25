import { push } from 'connected-react-router';
import * as ActionTypes from '../constants/ActionTypes';
import API from '../helpers/api';

export function getBranchById(id) {
	return async dispatch => {

		dispatch({
			type: ActionTypes.GET_BRANCH_BASIC_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.branches.getBranchById(id);

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_BRANCH_BASIC_ERROR,
				payload: {
					meta: response.meta,
					loading: false
				}
			});
		}

		const { branch } = response.data;

		dispatch({
			type: ActionTypes.GET_BRANCH_BASIC_SUCCESS,
			payload: {
				branch,
				loading: false
			}
		});
	};
}

export function getColleges() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.GET_BRANCH_BASIC_COLLEGES_REQUEST,
			payload: {
				loadingColleges: true,
				hasLoadedColleges: false
			}
		});

		const response = await API.colleges.getColleges();

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_BRANCH_BASIC_COLLEGES_ERROR,
				payload: {
					meta: response.meta,
					loadingColleges: false
				}
			});
		}

		const { colleges } = response.data;

		dispatch({
			type: ActionTypes.GET_BRANCH_BASIC_COLLEGES_SUCCESS,
			payload: {
				colleges,
				loadingColleges: false,
				hasLoadedColleges: true
			}
		});
	};
}

export function onSubmit(fields){
	return async (dispatch, getState) => {
		const { branch } = getState().BranchDetailsPage;

		dispatch({
			type: ActionTypes.SUBMIT_BRANCH_DETAIL_REQUEST,
			payload: {
				loadingSubmit: true
			}
		});

		const body = {
			branch: {
				...fields
			}
		};

		let response;
		if (branch) {
			body.branch.updated_at = fields.updated_at;
			response = await API.branches.updateBranchById(branch._id, body);
		} else {
			response = await API.branches.createBranch(body);
		}

		if (response.meta.code !== 200) {
			dispatch({
				type: ActionTypes.SUBMIT_BRANCH_DETAIL_ERROR,
				payload: {
					meta: response.meta,
					loadingSubmit: false
				}
			});
			return;
		}

		const { branch: newBranch } = response.data;

		dispatch({
			type: ActionTypes.SUBMIT_BRANCH_DETAIL_SUCCESS,
			payload: {
				meta: response.meta,
				branch: newBranch,
				loadingSubmit: false
			}
		});
		if (!branch) {
			dispatch(push(`/branches/id/basic?id=${newBranch._id}`));
		}

	};
}

export function resetMeta() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_BRANCH_BASIC_META
		});
	};
}

export function reset() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_BRANCH_BASIC
		});
	};
}