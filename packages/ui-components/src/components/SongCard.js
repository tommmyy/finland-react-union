import React from 'react';
import { cx, noop } from 'ramda-extension';
import classes from './SongCard.css';

const SongCard = ({ className, children, onClickLike, song }) => {
	const { id, name, artist, image, votes, order, spotifyHref } = song;
	return (
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
				<div className={cx(classes['song-name'])}>{name}</div>
				<div className={cx(classes.artist)}>{artist}</div>
			</div>
			<div className={cx(classes.item, classes['actions-wrapper'])}>
				<a className={cx(classes.action)} href={spotifyHref} target="_blank">
					play
				</a>
				<span
					className={cx(classes.action, classes['action-like'])}
					onClick={event => {
						onClickLike(event, song);
					}}
				>
					like
				</span>
			</div>
			{children}
		</div>
	);
};

SongCard.defaultProps = {
	onClickLike: noop,
};

export default SongCard;
