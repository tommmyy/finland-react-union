import { schema } from 'normalizr';

const songSchema = new schema.Entity('songs');
export default {
	SONG: songSchema,
	SONG_ARRAY: [songSchema],
};
