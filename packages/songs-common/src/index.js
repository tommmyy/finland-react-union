import fetch from 'isomorphic-fetch';

export const fetchPage = ({ page, limit }) =>
	fetch(
		`http://localhost:3004/api/songs?_sort=order&_order=asc&_page=${page}&_limit=${limit}`
	).then(response =>
		response.json().then(items => ({
			items,
			total: Number(response.headers.get('X-Total-Count')),
		}))
	);

export const like = song =>
	fetch(`http://localhost:3004/api/songs/${song.id}`, {
		method: 'put',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			...song,
			votes: Number(song.votes) + 1,
		}),
	}).then(response => response.json());
