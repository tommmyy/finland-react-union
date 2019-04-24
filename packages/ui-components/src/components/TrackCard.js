import React from 'react';
import { cx } from 'ramda-extension';
import classes from './TrackCard.css';

const TrackCard = ({ className, id, name, artist, image, votes, order, spotifyHref }) => (
	<div className={cx(classes.card, className)} key={id}>
		<div className={cx(classes.item, classes.order)}>{order}</div>
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
			<a className={cx(classes.action, classes['action-like'])} href={spotifyHref} target="_blank">
				like
			</a>
		</div>
	</div>
);

export default TrackCard;
