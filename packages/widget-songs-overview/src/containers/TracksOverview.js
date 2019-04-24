import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-fetch';
import TracksOverviewUI from '../components/TracksOverview';

const fetchPage = ({ page, limit }) =>
	fetch(
		`http://localhost:3004/api/tracks?_sort=votes&_order=desc&_page=${page}&_limit=${limit}`
	).then(response =>
		response.json().then(items => ({
			items,
			total: Number(response.headers.get('X-Total-Count')),
		}))
	);

const TracksOverview = ({ limit, initialPage }) => {
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

	return (
		<TracksOverviewUI
			page={page}
			paginationProps={{
				total,
				limit,
				page,
				onChangePage,
			}}
			tracks={tracks}
		/>
	);
};

TracksOverview.propTypes = { initialPage: PropTypes.number, limit: PropTypes.number };
TracksOverview.defaultProps = { initialPage: 1, limit: 20 };

export default TracksOverview;
