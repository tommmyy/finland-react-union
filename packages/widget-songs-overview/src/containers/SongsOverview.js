import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { map } from 'ramda';
import { fetchPage, like } from '@finland/songs-common';
import SongsOverviewUI from '../components/SongsOverview';

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

	const handleOnChangePage = useCallback(
		page => {
			fetchPage({ page, limit }).then(({ items, total }) => {
				setPage(page);
				setTotal(total);
				setSongs(items);
			});
		},
		[limit]
	);

	const handleOnClickLike = useCallback(
		(_, song) => {
			like(song).then(updated => {
				setSongs(map(x => (x.id === updated.id ? updated : x), songs));
			});
		},
		[songs]
	);
	return (
		<SongsOverviewUI
			page={page}
			paginationProps={{
				total,
				limit,
				page,
				onChangePage: handleOnChangePage,
			}}
			onClickLike={handleOnClickLike}
			songs={songs}
		/>
	);
};

SongsOverview.propTypes = { initialPage: PropTypes.number, limit: PropTypes.number };
SongsOverview.defaultProps = { initialPage: 1, limit: 20 };

export default SongsOverview;
