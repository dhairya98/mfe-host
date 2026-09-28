const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require("path");
const deps = require("./package.json").dependencies;

module.exports = {
	entry: "./src/index.js",
	mode: "development",
	devServer: {
		port: 3000,
		// historyApiFallback: true,
		hot: true,
		// client: {
		// 	overlay: false,
		// },
	},

	output: {
		publicPath: "auto",
	},
	resolve: {
		extensions: [".js", ".jsx"],
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env", "@babel/preset-react"],
					},
				},
			},
		],
	},
	plugins: [
		new ModuleFederationPlugin({
			name: "host_app",
			remotes: {
				product_list_mfe:
					"product_list_mfe@http://localhost:3002/remoteEntry.js",
				shared_components:
					"shared_components@http://localhost:3001/remoteEntry.js",
			},
			shared: {
				...deps,
				react: { singleton: true, requiredVersion: deps.react },
				"react-dom": {
					singleton: true,
					requiredVersion: deps["react-dom"],
				},
			},
		}),
		new HtmlWebpackPlugin({
			template: "./public/index.html",
		}),
	],
};
