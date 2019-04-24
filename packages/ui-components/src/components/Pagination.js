import React from 'react';
import PropTypes from 'prop-types';
import { values, range, map, clamp } from 'ramda';
import { cx } from 'ramda-extension';

import classes from './Pagination.css';

const Kinds = { LOCAL: 'local' };

const getPages = ({ currentPage, totalPages, shownPagesCount }) => {
	const sanitize = clamp(1, totalPages);

	if (shownPagesCount <= 1) {
		return [currentPage];
	} else if (currentPage <= shownPagesCount) {
		return range(1, sanitize(shownPagesCount + 1));
	} else if (currentPage >= totalPages - shownPagesCount) {
		return range(sanitize(totalPages - shownPagesCount + 1), totalPages + 1);
	} else {
		const left = Math.floor(shownPagesCount / 2);
		const right = shownPagesCount - left;

		return range(sanitize(currentPage - left), sanitize(currentPage + right));
	}
};

const Pagination = ({
	className,
	kind,
	total,
	limit,
	page: currentPage,
	onChangePage,
	shownPagesCount,
}) => {
	const totalPages = Math.ceil(total / limit);

	const hasNext = currentPage < totalPages;
	const hasPrev = currentPage > 1;
	const pages = getPages({ currentPage, totalPages, shownPagesCount });

	return (
		<nav className={cx(classes.root, kind && classes[`root--${kind}`], className)}>
			<ul className={classes.list}>
				{hasPrev && (
					<li className={cx(classes.item, classes.prev)}>
						<a
							className={classes.link}
							href="#"
							onClick={event => {
								event.preventDefault();
								onChangePage(currentPage - 1);
							}}
						>
							<span className={classes['arrow-prev']} />
							<span className={classes['text-prev']}>Previous</span>
						</a>
					</li>
				)}
				{kind !== Kinds.LOCAL &&
					map(page => (
						<li key={page} className={classes.item}>
							<a
								className={cx(classes.link, { [classes['link--active']]: page === currentPage })}
								href="#"
								onClick={event => {
									event.preventDefault();
									onChangePage(page);
								}}
							>
								{page}
							</a>
						</li>
					))(pages)}
				{hasNext && (
					<li className={cx(classes.item, classes.next)}>
						<a
							className={classes.link}
							href="#"
							onClick={event => {
								event.preventDefault();
								onChangePage(currentPage + 1);
							}}
						>
							<span className={classes['arrow-next']} />
							<span className={classes['text-next']}>Next</span>
						</a>
					</li>
				)}
			</ul>
		</nav>
	);
};

Pagination.propTypes = {
	kind: PropTypes.oneOf(values(Kinds)),
};

Pagination.defaultProps = {
	shownPagesCount: 5,
};

export default Pagination;
