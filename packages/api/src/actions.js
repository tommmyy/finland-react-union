import { identity, prop } from 'ramda';
import { noop } from 'ramda-extension';
import { makeActionTypes, makeActionCreator } from '@redux-tools/actions';

const getMeta = prop('meta');
const getData = prop('data');

export const ActionTypes = makeActionTypes('@core', [
	'API_FETCH',
	'API_FETCH_REQUEST',
	'API_FETCH_SUCCESS',
	'API_FETCH_ERROR',
]);

export const fetchRequest = makeActionCreator(ActionTypes.API_FETCH_REQUEST, noop, identity);

export const fetchSuccess = makeActionCreator(ActionTypes.API_FETCH_SUCCESS, getData, getMeta);

export const fetchError = makeActionCreator(ActionTypes.API_FETCH_ERROR, getData, getMeta);

export const requestAPI = makeActionCreator(ActionTypes.API_FETCH, getData, getMeta);
