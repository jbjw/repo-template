const path = require( "path" )

module.exports = {
	mode: "development",
	entry: "./source/index.js",
	output: {
		filename: "bundle.js",
		path: path.resolve( __dirname, "dist" ),
	},
	module: {
		rules: [
			{ test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader" },
			{ test: /\.css$/,
				use: [
					{ loader: "style-loader" },
					{ loader: "css-loader" },
				],
			},
		],
	},
	devServer: {
		contentBase: path.join( __dirname, "dist" ),
		compress: true,
		port: 80,
		open: true,
		overlay: {
			warnings: true,
			errors: true,
		},
		// https: true,
	},
}
