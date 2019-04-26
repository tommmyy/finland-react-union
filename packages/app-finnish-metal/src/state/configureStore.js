import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import entities from '@finland/entities';
import { middleware as apiMiddleware } from '@finland/api';
import songs, { middleware as songsMiddleware } from '@finland/songs-common';
import { name, version } from '../../package.json';

const reducer = combineReducers({ entities, songs });

const configureStore = preloadedState => {
	const composeEnhancers = composeWithDevTools({
		name: `${name}@${version}`,
		serialize: true,
		latency: 0,
	});

	const store = createStore(
		reducer,
		preloadedState,
		composeEnhancers(applyMiddleware(songsMiddleware(), apiMiddleware()))
	);

	return store;
};

export default configureStore;
