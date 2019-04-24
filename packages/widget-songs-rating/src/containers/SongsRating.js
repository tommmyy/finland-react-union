import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { head, o } from 'ramda';
import { defaultToEmptyArray } from 'ramda-extension';
import fetch from 'isomorphic-fetch';
import SongsRatingUI from '../components/SongsRating';

const safeHead = o(head, defaultToEmptyArray);

const fetchPage = ({ page, limit }) =>
	fetch(
		`http://localhost:3004/api/songs?_sort=votes&_order=desc&_page=${page}&_limit=${limit}`
	).then(response =>
		response.json().then(items => ({
			items,
			total: Number(response.headers.get('X-Total-Count')),
		}))
	);

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

	return songs ? (
		<SongsRatingUI
			paginationProps={{
				total,
				limit,
				page,
				onChangePage,
			}}
			song={safeHead(songs)}
		/>
	) : null;
};

SongsRating.propTypes = { initialPage: PropTypes.number, limit: PropTypes.number };
SongsRating.defaultProps = { initialPage: 1, limit: 1 };

export default SongsRating;