import React from 'react';
import { cx } from 'ramda-extension';
import { TrackCard, Pagination } from '@finland/ui-components';
import classes from './TracksRating.css';

const TracksRating = ({ paginationProps, track }) => {
	return track ? (
		<div className={cx(classes.root)}>
			<TrackCard track={{ ...track, order: 1 }}>
				<Pagination kind="local" className={classes.pagination} {...paginationProps} />
			</TrackCard>
		</div>
	) : null;
};

export default TracksRating;
