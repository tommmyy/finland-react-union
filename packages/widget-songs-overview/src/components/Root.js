import React from 'react';
import { Provider } from '@redux-tools/reducers-react';
import SongsOverview from '../containers/SongsOverview';

const Root = ({ namespace }) => {
	return (
		<Provider namespace={namespace}>
			<SongsOverview />
		</Provider>
	);
};

export default Root;
