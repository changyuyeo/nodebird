module.exports = {
	parser: 'babel-eslint',
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module'
	},
	extends: ['airbnb-base', 'plugin:node/recommended', 'prettier'],
	rules: {
		'node/no-unpublished-import': 'off',
		'import/extensions': 'off',
		'consistent-return': 'off',
		'no-console': 'off',
		'no-undef': 'off'
	}
}
