module.exports = {
	root: true,
	extends: ['react-union'],
	rules: {
		'react/prop-types': 'off',
		'import/no-extraneous-dependencies': [
			'error',
			{
				devDependencies: ['json-server/**/scripts/*.js'],
			},
		],
	},
};
