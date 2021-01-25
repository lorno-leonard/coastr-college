import { push } from 'connected-react-router';
import * as ActionTypes from '../constants/ActionTypes';
import API from '../helpers/api';

export function getColleges({ page, limit }) {
	return async dispatch => {
		// Update Path
		const optionsQuery = [`page=${page}`, limit && `limit=${limit}`];
		dispatch(push(`/colleges?${optionsQuery.filter(Boolean).join('&')}`));

		dispatch({
			type: ActionTypes.GET_COLLEGES_PAGE_REQUEST,
			payload: {
				loading: true
			}
		});


		const response = await API.colleges.getColleges({
			page,
			limit
		});

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_COLLEGES_PAGE_ERROR,
				payload: {
					meta: response.meta,
					loading: false
				}
			});
		}

		const { colleges } = response.data;

		dispatch({
			type: ActionTypes.GET_COLLEGES_PAGE_SUCCESS,
			payload: {
				colleges,
				page: response.data.page,
				limit: response.data.limit,
				total: response.data.total,
				count: response.data.count,
				loading: false
			}
		});
	};
}

export function resetMeta() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_COLLEGES_PAGE_META
		});
	};
}

export function reset() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_COLLEGES_PAGE
		});
	};
}