import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { head, o } from 'ramda';
import { defaultToEmptyArray } from 'ramda-extension';
import fetch from 'isomorphic-fetch';
import TracksRatingUI from '../components/TracksRating';

const safeHead = o(head, defaultToEmptyArray);

const fetchPage = ({ page, limit }) =>
	fetch(
		`http://localhost:3004/api/tracks?_sort=votes&_order=desc&_page=${page}&_limit=${limit}`
	).then(response =>
		response.json().then(items => ({
			items,
			total: Number(response.headers.get('X-Total-Count')),
		}))
	);

const TracksRating = ({ limit, initialPage }) => {
	const [tracks, setTracks] = useState();
	const [total, setTotal] = useState();
	const [page, setPage] = useState(initialPage);

	useEffect(() => {
		fetchPage({ page, limit }).then(({ items, total }) => {
			setTotal(total);
			setTracks(items);
		});
	}, []);

	const onChangePage = useCallback(
		page => {
			fetchPage({ page, limit }).then(({ items, total }) => {
				setPage(page);
				setTotal(total);
				setTracks(items);
			});
		},
		[limit]
	);

	return tracks ? (
		<TracksRatingUI
			paginationProps={{
				total,
				limit,
				page,
				onChangePage,
			}}
			track={safeHead(tracks)}
		/>
	) : null;
};

TracksRating.propTypes = { initialPage: PropTypes.number, limit: PropTypes.number };
TracksRating.defaultProps = { initialPage: 1, limit: 1 };

export default TracksRating;
