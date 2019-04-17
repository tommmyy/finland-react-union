import universal from 'react-universal-component';

export default [
	{
		path: 'hero',
		component: universal(import('@finland/widget-hero')),
	},
	{
		path: 'content',
		component: universal(import('@finland/widget-content')),
	},
];
