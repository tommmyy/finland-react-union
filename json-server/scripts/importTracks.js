const fetch = require('isomorphic-fetch');
const fs = require('fs-extra');
const path = require('path');

require('dotenv').config();

const PLAYLIST = '3TO9ZskHr3Bh6AyjUYReu2';
const OUTPUT_FILE = path.join(__dirname, '../db.json');

const importPage = nextURL =>
	fetch(nextURL, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			Authorization: `Bearer ${process.env.SPOTIFY_TOKEN}`,
		},
	})
		.then(data => data.json())
		.then(page => {
			const isInitialRequest = !!page.tracks;
			const requestedCurrentData = isInitialRequest
				? Promise.resolve([])
				: fs.readJSON(OUTPUT_FILE);

			return requestedCurrentData.then(currentData => ({ currentData, page }));
		})
		.then(({ page, currentData }) => {
			return fs
				.writeJSON(OUTPUT_FILE, [...currentData, ...(page.tracks ? page.tracks.items : page.items)])
				.then(() => (page.tracks ? page.tracks.next : page.next));
		});

const importAllPages = URL => {
	return URL
		? (console.log(`Importing... ${URL}`), importPage(URL).then(importAllPages))
		: Promise.resolve();
};

const clearOutput = () => fs.writeJSON(OUTPUT_FILE, '');
clearOutput()
	.then(() => importAllPages(`https://api.spotify.com/v1/playlists/${PLAYLIST}`))
	.then(() => console.log('🤘 Fresh Metal successfully imported 🤘'))
	.catch(err => console.log(err));
