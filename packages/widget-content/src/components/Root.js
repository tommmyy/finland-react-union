import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Root = ({ data: { messages } }) => {
	const [users, setUsers] = useState();
	useEffect(() => {
		fetch('http://localhost:3004/api/users')
			.then(x => x.json())
			.then(x => setUsers(x));
	}, []);
	return (
		<section>
			<h1>{messages && messages.heading}</h1>
			<ul>{users && users.map(user => <li key={user.id}>tom {user.name}</li>)}</ul>
		</section>
	);
};

Root.propTypes = {
	data: PropTypes.shape({
		messages: PropTypes.shape({
			heading: PropTypes.node,
			content: PropTypes.node,
		}),
	}),
};

Root.defaultProps = {
	data: {},
};

export default Root;
