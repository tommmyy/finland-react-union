const path = require('path');

module.exports = ({ target, script, ...rest }) => (
	console.log(rest),
	{
		workspaces: {
			widgetPattern: ['widget'],
			appPattern: ['app'],
		},
		sourceMaps: false,
		...(target === 'wp'
			? {
					outputMapper: {
						js: 'js',
					},
					proxy: {
						port: 3300,
					},
					apps: [
						{
							name: 'app-demo',
							publicPath: '/wp-content/themes/my-theme/app-demo/',
							proxy: {
								target: 'http://localhost:8080',
								publicPath: '/wp-content/themes/my-theme/app-demo/',
							},
							paths:
								script === 'build'
									? {
											build: path.join(__dirname, 'wordpress/theme/app-demo'),
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
					apps: [
						{
							name: 'app-demo',
							publicPath: '/o/liferay-amd-loader/app-demo/',
							proxy: {
								target: 'http://localhost:8080',
								publicPath: '/o/liferay-amd-loader/app-demo/',
							},
						},
					],
			  }
			: {}),
	}
);
