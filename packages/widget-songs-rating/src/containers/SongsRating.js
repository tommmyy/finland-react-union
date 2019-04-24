import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { head, o, map } from 'ramda';
import { defaultToEmptyArray } from 'ramda-extension';
import { fetchPage, like } from '@finland/songs-common';
import SongsRatingUI from '../components/SongsRating';

const safeHead = o(head, defaultToEmptyArray);

const SongsRating = ({ limit, initialPage }) => {
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
		[songs]
	);

	const handleOnClickLike = useCallback(
		(_, song) => {
			like(song).then(updated => {
				setSongs(map(x => (x.id === updated.id ? updated : x), songs));
			});
		},
		[songs]
	);

	return songs ? (
		<SongsRatingUI
			paginationProps={{
				total,
				limit,
				page,
				onChangePage: handleOnChangePage,
			}}
			onClickLike={handleOnClickLike}
			song={safeHead(songs)}
		/>
	) : null;
};

SongsRating.propTypes = { initialPage: PropTypes.number, limit: PropTypes.number };
SongsRating.defaultProps = { initialPage: 1, limit: 1 };

export default SongsRating;
