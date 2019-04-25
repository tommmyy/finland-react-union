import React from 'react';
import { Provider } from '@redux-tools/reducers-react';
import SongsRating from '../containers/SongsRating';

const Root = ({ namespace }) => {
	return (
		<Provider namespace={namespace}>
			<SongsRating />
		</Provider>
	);
};

export default Root;
