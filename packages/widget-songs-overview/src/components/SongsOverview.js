import React, { useMemo } from 'react';
import { cx } from 'ramda-extension';
import { map } from 'ramda';
import { SongCard, Pagination } from '@finland/ui-components';

import classes from './SongsOverview.css';

const SongsOverview = ({ paginationProps, songs, onClickLike }) => {
	const rows = useMemo(
		() =>
			songs &&
			map(
				song => (
					<SongCard
						key={song.id} className={classes.row} onClickLike={onClickLike}
						song={song}
					/>
				),
				songs
			),
		[songs]
	);

	const pagination = useMemo(() => <Pagination {...paginationProps} />, [...paginationProps]);

	return songs ? (
		<div className={cx(classes.root)}>
			<div className={cx(classes.list)}>{rows}</div>
			<div className={cx(classes.pagination)}>{pagination}</div>
		</div>
	) : null;
};

export default SongsOverview;
