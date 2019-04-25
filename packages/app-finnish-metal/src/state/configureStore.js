import { createStore, applyMiddleware } from 'redux';
import { identity } from 'ramda';
import { makeEnhancer as makeInjectableReducers } from '@redux-tools/reducers';
import { makeEnhancer as makeInjectableMiddleware } from '@redux-tools/middleware';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import entities from '@finland/entities';
import { middleware as apiMiddleware } from '@finland/api';
import { name, version } from '../../package.json';

const reducersEnhancer = makeInjectableReducers();
const middlewareEnhancer = makeInjectableMiddleware();
const { injectedMiddleware } = middlewareEnhancer;

const configureStore = preloadedState => {
	const composeEnhancers = composeWithDevTools({
		name: `${name}@${version}`,
		serialize: true,
		latency: 0,
	});

	const store = createStore(
		identity,
		preloadedState,
		composeEnhancers(
			reducersEnhancer,
			middlewareEnhancer,
			applyMiddleware(injectedMiddleware, apiMiddleware())
		)
	);

	store.injectReducers({ entities }, {});

	return store;
};

export default configureStore;
