import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { cx, mapIndexed } from 'ramda-extension';
import classes from './TracksOverview.css';

const TracksOverview = ({ tracks, offset }) => {
	const rows = useMemo(
		() =>
			tracks &&
			mapIndexed(
				({ id, name, artist, image, votes, spotifyHref, ...rest }, i) => (
					<div className={classes.row} key={id}>
						<div className={cx(classes.item, classes.order)}>{offset + i + 1}</div>
						<div className={cx(classes.item, classes['image-wrapper'])}>
							<img
								className={classes.image} src={image} width="64"
								height="64"
							/>
						</div>
						<div className={cx(classes.item, classes.votes)}>{votes}x</div>
						<div className={cx(classes.item, classes['text-wrapper'])}>
							<div className={cx(classes['track-name'])}>{name}</div>
							<div className={cx(classes.artist)}>{artist}</div>
						</div>
						<div className={cx(classes.item, classes['actions-wrapper'])}>
							<a className={cx(classes.action)} href={spotifyHref} target="_blank">
								play
							</a>
							<a
								className={cx(classes.action, classes['action-like'])}
								href={spotifyHref}
								target="_blank"
							>
								like
							</a>
						</div>
					</div>
				),
				tracks
			),
		[tracks]
	);

	return tracks ? (
		<div className="tracks-overview">
			<div className="tracks-overview-list">{rows}</div>
		</div>
	) : null;
};

TracksOverview.propTypes = {
	offset: PropTypes.number,
	tracks: PropTypes.array,
};

TracksOverview.defaultProps = {
	offset: 0,
};

export default TracksOverview;
