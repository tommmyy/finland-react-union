import React from 'react';
import { cx } from 'ramda-extension';
import { SongCard, Pagination } from '@finland/ui-components';
import classes from './SongsRating.css';

const SongsRating = ({ paginationProps, onClickLike, song }) => {
	return song ? (
		<div className={cx(classes.root)}>
			<SongCard song={song} onClickLike={onClickLike}>
				<Pagination kind="local" className={classes.pagination} {...paginationProps} />
			</SongCard>
		</div>
	) : null;
};

export default SongsRating;
