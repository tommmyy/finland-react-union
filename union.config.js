const path = require('path');

module.exports = ({ target, script }) => ({
	workspaces: {
		widgetPattern: ['widget'],
		appPattern: ['app'],
	},
	sourceMaps: false,
	...(target === 'wp'
		? {
				proxy: {
					port: 3300,
				},
				apps: [
					{
						name: 'app-finnish-metal',
						publicPath: '/wp-content/themes/my-theme/app-finnish-metal/',
						proxy: {
							target: 'http://localhost:8080',
							publicPath: '/wp-content/themes/my-theme/app-finnish-metal/',
						},
						paths:
							script === 'build'
								? {
										build: path.join(__dirname, 'wordpress/theme/app-finnish-metal'),
								  }
								: {},
					},
				],
		  }
		: {}),
	...(target === 'liferay'
		? {
				outputMapper: {
					js: 'js',
					css: 'css',
				},
				proxy: {
					port: 3301,
				},
				apps: [
					{
						name: 'app-finnish-metal',
						publicPath: '/o/liferay-amd-loader/app-demo/',
						proxy: {
							target: 'http://localhost:8081',
							publicPath: '/o/liferay-amd-loader/app-demo/',
						},
					},
				],
		  }
		: {}),
});
