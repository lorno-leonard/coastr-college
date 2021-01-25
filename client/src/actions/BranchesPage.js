import { push } from 'connected-react-router';
import * as ActionTypes from '../constants/ActionTypes';
import API from '../helpers/api';

export function getBranches({ page, limit, college_id }) {
	return async dispatch => {
		// Update Path
		const optionsQuery = [`page=${page}`, limit && `limit=${limit}`, `college_id=${college_id}`];
		dispatch(push(`/branches?${optionsQuery.filter(Boolean).join('&')}`));

		dispatch({
			type: ActionTypes.GET_BRANCHES_PAGE_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.branches.getBranches({
			page,
			limit,
			...(college_id && { college_id })
		});

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_BRANCHES_PAGE_ERROR,
				payload: {
					meta: response.meta,
					loading: false
				}
			});
		}

		const { branches } = response.data;

		dispatch({
			type: ActionTypes.GET_BRANCHES_PAGE_SUCCESS,
			payload: {
				branches,
				page: response.data.page,
				limit: response.data.limit,
				total: response.data.total,
				count: response.data.count,
				loading: false
			}
		});
	};
}

export function getColleges() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.GET_BRANCHES_PAGE_COLLEGES_REQUEST,
			payload: {
				loadingColleges: true,
				hasLoadedColleges: false
			}
		});

		const response = await API.colleges.getColleges();

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_BRANCHES_PAGE_COLLEGES_ERROR,
				payload: {
					meta: response.meta,
					loadingColleges: false
				}
			});
		}

		const { colleges } = response.data;

		dispatch({
			type: ActionTypes.GET_BRANCHES_PAGE_COLLEGES_SUCCESS,
			payload: {
				colleges,
				loadingColleges: false,
				hasLoadedColleges: true
			}
		});
	};
}

export function resetMeta() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_BRANCHES_PAGE_META
		});
	};
}

export function reset() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_BRANCHES_PAGE
		});
	};
}