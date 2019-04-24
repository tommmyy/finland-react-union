import universal from 'react-universal-component';

export default [
	{
		path: 'songs-overview',
		component: universal(import('@finland/widget-songs-overview')),
	},
	{
		path: 'songs-rating',
		component: universal(import('@finland/widget-songs-rating')),
	},
];
