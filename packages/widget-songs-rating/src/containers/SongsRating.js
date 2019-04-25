import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { head, o } from 'ramda';
import { defaultToEmptyArray } from 'ramda-extension';
import { fetchSongs, likeSong, getVisibleSongs, getPagination } from '@finland/songs-common';
import SongsRatingUI from '../components/SongsRating';

const safeHead = o(head, defaultToEmptyArray);

const SongsRating = ({ songs, fetchSongs, likeSong, pagination, initialPage, limit }) => {
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

	return songs ? (
		<SongsRatingUI
			paginationProps={{
				...pagination,
				limit,
				onChangePage: handleOnChangePage,
			}}
			onClickLike={handleOnClickLike}
			song={safeHead(songs)}
		/>
	) : null;
};

SongsRating.propTypes = { initialPage: PropTypes.number, limit: PropTypes.number };
SongsRating.defaultProps = { initialPage: 1, limit: 1 };

export default connect(
	state => ({
		songs: getVisibleSongs(state),
		pagination: getPagination(state),
	}),
	{ fetchSongs, likeSong }
)(SongsRating);
