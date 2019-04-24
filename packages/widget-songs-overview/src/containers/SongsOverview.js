import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-fetch';
import SongsOverviewUI from '../components/SongsOverview';

const fetchPage = ({ page, limit }) =>
	fetch(
		`http://localhost:3004/api/songs?_sort=votes&_order=desc&_page=${page}&_limit=${limit}`
	).then(response =>
		response.json().then(items => ({
			items,
			total: Number(response.headers.get('X-Total-Count')),
		}))
	);

const SongsOverview = ({ limit, initialPage }) => {
	const [songs, setSongs] = useState();
	const [total, setTotal] = useState();
	const [page, setPage] = useState(initialPage);

	useEffect(() => {
		fetchPage({ page, limit }).then(({ items, total }) => {
			setTotal(total);
			setSongs(items);
		});
	}, []);

	const onChangePage = useCallback(
		page => {
			fetchPage({ page, limit }).then(({ items, total }) => {
				setPage(page);
				setTotal(total);
				setSongs(items);
			});
		},
		[limit]
	);

	return (
		<SongsOverviewUI
			page={page}
			paginationProps={{
				total,
				limit,
				page,
				onChangePage,
			}}
			songs={songs}
		/>
	);
};

SongsOverview.propTypes = { initialPage: PropTypes.number, limit: PropTypes.number };
SongsOverview.defaultProps = { initialPage: 1, limit: 20 };

export default SongsOverview;
