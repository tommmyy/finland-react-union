import { mergeWith, merge, useWith, path, identity } from 'ramda';
import { makeSimpleActionCreator, makeActionTypes, makeReducer } from '@redux-tools/actions';

export const SCOPE = '@core';

export const ActionTypes = makeActionTypes(SCOPE, ['MERGE_ENTITIES', 'SET_ENTITIES']);

export const setEntities = makeSimpleActionCreator(ActionTypes.SET_ENTITIES);
export const mergeEntities = makeSimpleActionCreator(ActionTypes.MERGE_ENTITIES);

export const initialState = {};

export default makeReducer(
	[
		[ActionTypes.SET_ENTITIES, (state, action) => action.payload],
		// NOTE: If we merge e.g. { a, b } and { b, c }, we want to SHALLOWLY merge `b` (so we don't merge individual entities).
		[ActionTypes.MERGE_ENTITIES, useWith(mergeWith(merge), [identity, path(['payload'])])],
	],
	initialState
);
