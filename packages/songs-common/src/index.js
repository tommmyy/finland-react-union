import {
	makeSimpleActionCreator,
	makeActionCreator,
	makeActionTypes,
	makeReducer,
} from '@redux-tools/actions';
import { ActionTypes as APIActionTypes, requestAPI } from '@finland/api';
import { mergeEntities } from '@finland/entities';
import { map, path } from 'ramda';
import { normalize } from 'normalizr';
import Schemas from './schemas';

export const SCOPE = '@songs';

export const ActionTypes = makeActionTypes(SCOPE, ['FETCH_SONGS', 'LIKE_SONG', 'SET_SONGS']);

export const fetchSongs = makeSimpleActionCreator(ActionTypes.FETCH_SONGS);
export const likeSong = makeSimpleActionCreator(ActionTypes.LIKE_SONG);
export const setSongs = makeActionCreator(ActionTypes.SET_SONGS, path(['data']), path(['meta']));

export const getPagination = path(['songs', 'pagination']);
export const getVisibleIds = path(['songs', 'visibleIds']);
export const getEntities = path(['entities', 'songs']);

export const getVisibleSongs = entities => localState => {
	const visibleIds = getVisibleIds(localState);

	return visibleIds && entities ? map(id => entities[id], visibleIds) : null;
};

export const middleware = () => ({ dispatch }) => next => action => {
	next(action);

	if (action.type === ActionTypes.FETCH_SONGS) {
		dispatch(
			requestAPI({
				data: { endpoint: 'songs', pagination: action.payload },
				meta: {
					...action.meta,
					key: ActionTypes.FETCH_SONGS,
				},
			})
		);
	}

	if (action.type === ActionTypes.LIKE_SONG) {
		dispatch(
			requestAPI({
				data: {
					method: 'put',
					endpoint: `songs/${action.payload.id}`,
					body: { ...action.payload, votes: action.payload.votes + 1 },
				},
				meta: {
					...action.meta,
					key: ActionTypes.LIKE_SONG,
				},
			})
		);
	}

	if (
		action.type === APIActionTypes.API_FETCH_SUCCESS &&
		action.meta.key === ActionTypes.FETCH_SONGS
	) {
		const normalizedPayload = normalize(action.payload, Schemas.SONG_ARRAY);
		dispatch(mergeEntities(normalizedPayload.entities));
		dispatch(
			setSongs({
				data: {
					pagination: action.meta.pagination,
					visibleIds: normalizedPayload.result,
				},
				meta: action.meta,
			})
		);
	}

	if (
		action.type === APIActionTypes.API_FETCH_SUCCESS &&
		action.meta.key === ActionTypes.LIKE_SONG
	) {
		const normalizedPayload = normalize(action.payload, Schemas.SONG);
		dispatch(mergeEntities(normalizedPayload.entities));
	}
};
const initialState = {
	pagination: {},
	visibleIds: [],
};

export default makeReducer(
	[
		[
			ActionTypes.SET_SONGS,
			(state, action) => {
				return action.payload;
			},
		],
	],
	initialState
);
