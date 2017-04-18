// var webpack = require('webpack');
<<<<<<< HEAD
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'dist');
var APP_DIR = path.resolve(__dirname, 'src');

var config = {
=======
const path = require('path');

const DIST = path.resolve(__dirname, 'dist');
const SRC = path.resolve(__dirname, 'src');

module.exports = {
	devtool: 'source-map',
>>>>>>> 6f16b71191c80c73012d4d39667296e0136b35e5
	devServer: {
		inline: true,
		// hot: true,
		contentBase: 'dist/',
		port: 80,
	},
<<<<<<< HEAD
	entry: path.resolve(APP_DIR, 'main.js'),
	output: {
		path: BUILD_DIR,
=======
	entry: path.resolve(DIST, 'main.js'),
	output: {
		path: SRC,
>>>>>>> 6f16b71191c80c73012d4d39667296e0136b35e5
		filename: 'bundle.js',
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: ['es2015', 'react'],
				},
			},
		],
	},
};
<<<<<<< HEAD

module.exports = config;
=======
>>>>>>> 6f16b71191c80c73012d4d39667296e0136b35e5
