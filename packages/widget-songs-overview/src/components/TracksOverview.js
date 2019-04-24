import React, { useMemo } from 'react';
import { cx } from 'ramda-extension';
import { map } from 'ramda';
import { TrackCard, Pagination } from '@finland/ui-components';

import classes from './TracksOverview.css';

const TracksOverview = ({ paginationProps, tracks }) => {
	const rows = useMemo(
		() =>
			tracks &&
			map(track => <TrackCard key={track.id} className={classes.row} track={track} />, tracks),
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
