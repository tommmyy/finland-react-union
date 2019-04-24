import React from 'react';
import { range, map } from 'ramda';
import { cx } from 'ramda-extension';
import classes from './Pagination.css';

const Pagination = ({ total, limit, page: currentPage, onChangePage }) => {
	const totalPages = Math.ceil(total / limit);

	const hasNext = currentPage < totalPages;
	const hasPrev = currentPage > 1;
	const pages = range(1, totalPages + 1);

	return (
		<nav className={classes.root}>
			<ul className={classes.list}>
				{hasPrev && (
					<li className={classes.item}>
						<a
							className={classes.link}
							href="#"
							onClick={event => {
								event.preventDefault();
								onChangePage(currentPage - 1);
							}}
						>
							Previous
						</a>
					</li>
				)}
				{map(page => (
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
					<li className={classes.item}>
						<a
							className={classes.link}
							href="#"
							onClick={event => {
								event.preventDefault();
								onChangePage(currentPage + 1);
							}}
						>
							Next
						</a>
					</li>
				)}
			</ul>
		</nav>
	);
};

export default Pagination;
