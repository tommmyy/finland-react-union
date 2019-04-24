import React, { useMemo } from 'react';
import { cx, mapIndexed } from 'ramda-extension';
import { TrackCard, Pagination } from '@finland/ui-components';

import classes from './TracksOverview.css';

const TracksOverview = ({ paginationProps, tracks }) => {
	const { page, limit } = paginationProps;
	const offset = (page - 1) * limit;

	const rows = useMemo(
		() =>
			tracks &&
			mapIndexed(
				(track, i) => (
					<TrackCard
						key={track.id}
						className={classes.row}
						track={{ ...track, order: offset + i + 1 }}
					/>
				),
				tracks
			),
		[tracks]
	);

	const pagination = useMemo(() => <Pagination {...paginationProps} />, [...paginationProps]);

	return tracks ? (
		<div className={cx(classes.root)}>
			<div className={cx(classes.list)}>{rows}</div>
			<div className={cx(classes.pagination)}>{pagination}</div>
		</div>
	) : null;
};

export default TracksOverview;
