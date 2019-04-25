import { compose, toUpper, intersperse, toPairs, map, join, reject, equals } from 'ramda';
import { flipIncludes, rejectNil } from 'ramda-extension';
import fetch from 'isomorphic-fetch';

import { ActionTypes, fetchError, fetchRequest, fetchSuccess } from './actions';

const serializeQueryParams = compose(
	join(''),
	intersperse('&'),
	map(join('')),
	map(intersperse('=')),
	toPairs,
	reject(equals('')),
	rejectNil
);
const getPaginationQuery = ({ page, limit, order, sort }) => ({
	_order: order,
	_sort: sort,
	_limit: limit,
	_page: page,
});

/**
 * Core middlware for handling API calls.
 *
 * @see {@link requestAPI} For more informations.
 */
export const middleware = () => ({ dispatch }) => next => action => {
	next(action);

	if (action.type === ActionTypes.API_FETCH) {
		const { pagination, queryParams = {}, endpoint, method = 'GET', body } = action.payload;
		console.log(action.meta)

		const queryString = serializeQueryParams(
			pagination ? { ...queryParams, ...getPaginationQuery(pagination) } : queryParams
		);

		const url = `http://localhost:3004/api/${endpoint}?${queryString}`;

		dispatch(fetchRequest({ ...action.meta, url, queryString }));

		fetch(url, {
			method,
			...(flipIncludes(['PUT', 'POST'])(toUpper(method))
				? {
						headers: {
							Accept: 'application/json',
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(body),
				  }
				: {}),
		})
			.then(response =>
				response.json().then(data => ({
					totalCount: Number(response.headers.get('X-Total-Count')),
					data,
				}))
			)
			.then(
				({ data, totalCount }) => {
					dispatch(
						fetchSuccess({
							data,
							meta: {
								...action.meta,
								...(pagination
									? {
											pagination: { ...pagination, totalCount },
									  }
									: {}),
							},
						})
					);
				},
				err => {
					dispatch(fetchError({ data: err.toString(), meta: action.meta }));
				}
			);
	}
};
