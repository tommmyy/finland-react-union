const db = require('./dbPlaylist.json');
const R = require('ramda');
const R_ = require('ramda-extension');

const toSong = R.applySpec({
	id: R.path(['track', 'id']),
	name: R.path(['track', 'name']),
	artist: R.path(['track', 'artists', 0, 'name']),
	album: R.path(['track', 'artists', 0, 'name']),
	image: R.path(['track', 'album', 'images', 2, 'url']),
	spotifyHref: R.path(['track', 'external_urls', 'spotify']),
	previewURL: R.path(['track', 'preview_url']),
	votes: () => Math.floor(Math.random() * 10000),
});

const addOrderProp = R.o(
	R_.mapIndexed((x, order) => ({ ...x, order: order + 1 })),
	R.sort(R.descend(R.prop('votes')))
);

module.exports = () => {
	const songs = R.o(addOrderProp, R.map(toSong))(db);
	return { songs };
};
