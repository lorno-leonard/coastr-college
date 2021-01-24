module.exports = {
	extends: 'airbnb-base',
	rules: {
		indent: [
			'error',
			'tab',
			{
				SwitchCase: 1
			}
		],
		'linebreak-style': 0,
		'no-tabs': 'off',
		'import/no-dynamic-require': 'off',
		'comma-dangle': ['error', 'never'],
		'object-curly-newline': 'off',
		'arrow-parens': 'off',
		'max-len': 'off',
		camelcase: 'off',
		'no-underscore-dangle': 'off',
		'no-await-in-loop': 'off',
		'no-plusplus': 'off',
		'no-param-reassign': 'off',
		'no-continue': 'off',
		'no-nested-ternary': 'off',
		'no-console': 'off',
		'prefer-destructuring': 'off',
		'no-lonely-if': 'off',
		'no-useless-catch': 'off',
		'array-element-newline': 'off'
	}
};
