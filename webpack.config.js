<<<<<<< HEAD
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const path = require('path');

const DIST = path.resolve(__dirname, 'dist');
const SRC = path.resolve(__dirname, 'src');

module.exports = {

	entry: path.resolve(SRC, 'main.js'),
	output: {
		path: DIST,
		filename: 'bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				include: [SRC],
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					presets: ['es2015', 'react'],
				},
			},
			{
				test: /\.jsx?$/,
				enforce: 'pre',
				include: [SRC],
				exclude: /node_modules/,
				loader: 'eslint-loader',
				options: {
					configFile: './.eslintrc',
				},
			},
			{
				test: /\.css?$/,
				include: [SRC],
				exclude: /node_modules/,
				use: [
					'style-loader',
					'css-loader',
				]
			},
		],
	},
	plugins: [
		new CopyWebpackPlugin([
			{
				from: 'src/index.html',
				to: 'index.html'
			},
		]),

		new OpenBrowserPlugin({
			url: 'http://localhost:3000/'
		}),
	],
	// devServer: {
	//   historyApiFallback: true,
	//   host: '0.0.0.0',
	//   port: 3000,
	//   stats: 'errors-only',
	//   noInfo: true,
	//   watchOptions: {
	//     aggregateTimeout: 300,
	//     poll: 1000,
	//     ignored: /node_modules/
	//   }
	// },
	devtool: 'source-map',
	devServer: {
		inline: true,
		// hot: true,
		contentBase: 'dist/',
		port: 80,
	},
};
