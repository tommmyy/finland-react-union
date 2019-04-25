import React from 'react';
import { hot } from 'react-hot-loader';
import { Union } from 'react-union';
import { Provider } from '@redux-tools/reducers-react';

import routes from '../../routes';
import configureStore from '../../state/configureStore';

import './Root.css';

const store = configureStore();
const Root = () => {
	return (
		<Provider store={store}>
			<Union routes={routes} />
		</Provider>
	);
};

export default hot(module)(Root);
