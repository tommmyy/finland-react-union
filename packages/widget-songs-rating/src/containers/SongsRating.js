import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { head, o, compose } from 'ramda';
import { defaultToEmptyArray } from 'ramda-extension';
import { withMiddleware } from '@redux-tools/middleware-react';
import { withReducers, namespacedConnect } from '@redux-tools/reducers-react';
import songs, {
	middleware as songsMiddleware,
	fetchSongs,
	likeSong,
	getVisibleSongs,
	getPagination,
} from '@finland/songs-common';
import { getEntity } from '@finland/entities';

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

export default compose(
	withReducers({ songs }),
	withMiddleware({ songsRating: songsMiddleware() }),
	connect(state => ({ songsEntities: getEntity('songs')(state) })),
	namespacedConnect(
		(state, { songsEntities }) => ({
			songs: getVisibleSongs(songsEntities)(state),
			pagination: getPagination(state),
		}),
		{
			fetchSongs,
			likeSong,
		}
	)
)(SongsRating);
