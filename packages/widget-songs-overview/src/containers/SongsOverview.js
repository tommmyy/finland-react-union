import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchSongs, likeSong, getVisibleSongs, getPagination } from '@finland/songs-common';
import SongsOverviewUI from '../components/SongsOverview';

const SongsOverview = ({ songs, fetchSongs, likeSong, pagination, initialPage, limit }) => {
	useEffect(() => {
		fetchSongs({ page: initialPage, limit, order: 'asc', sort: 'order' });
	}, []);

	const handleOnChangePage = useCallback(
		page => {
			fetchSongs({ ...pagination, page, order: 'asc', sort: 'order' });
		},
		[songs]
	);

	const handleOnClickLike = useCallback(
		(_, song) => {
			likeSong(song);
		},
		[songs]
	);
	return (
		<SongsOverviewUI
			paginationProps={{
				...pagination,
				limit,
				onChangePage: handleOnChangePage,
			}}
			onClickLike={handleOnClickLike}
			songs={songs}
		/>
	);
};

SongsOverview.propTypes = { initialPage: PropTypes.number, limit: PropTypes.number };
SongsOverview.defaultProps = { initialPage: 1, limit: 20 };

export default connect(
	state => ({
		songs: getVisibleSongs(state),
		pagination: getPagination(state),
	}),
	{ fetchSongs, likeSong }
)(SongsOverview);
