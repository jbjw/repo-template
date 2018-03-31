module.exports = {
	"extends": [
		"eslint:recommended",
		"p5js",
	],
	"parserOptions": {
		"ecmaVersion": 6,
		"sourceType": "module",
		"ecmaFeatures": {
			"jsx": true,
		},
	},
	"env": {
		"browser": true,
		"es6": true,
		"node": true,
	},
	globals: {
		"THREE": false,
		"GAME": false,
		"utils": false,
		"Stats": false,
		"p5": false,
	},
	"rules": {
		"no-console": "off",
		"no-unused-vars": "warn",
		"semi": ["warn", "never"],
		// "comma-dangle": https://eslint.org/docs/rules/comma-dangle
	},
}
