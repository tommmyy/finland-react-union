import React from 'react';
import { cx } from 'ramda-extension';
import classes from './Link.css';

const Link = ({ className, ...rest }) => (
	<a {...rest} className={cx(classes.root, className)} data-senna-off="true" />
);

export default Link;
