const webpack = require("webpack");
const merge = require("webpack-merge");

const HTMLPlugin = require("html-webpack-plugin");
const SWPrecachePlugin = require("sw-precache-webpack-plugin");

const base = require("./webpack.base.config");
const config = require("../../config");

const VueSSRClientPlugin = require("vue-server-renderer/client-plugin");

const minifyOptions = {
	collapseWhitespace: true,
	removeComments: true,
	ignoreCustomComments: [/vue-ssr-outlet/]
}

const clientConfig = merge(base, {
	plugins: [
		new webpack.DefinePlugin({
			"process.env.VUE_ENV": "'client'"
		}),
		new HTMLPlugin({
			template: "source/shared/index.template.html",
			minify: config.isProduction ? minifyOptions : {}
		}),
		new VueSSRClientPlugin()
	]
})

if (config.isProduction) {
	clientConfig.plugins.push(
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
		new SWPrecachePlugin({
			cacheId: "vue-ssr-csr",
			filename: "service-worker.js",
			minify: true,

			staticFileGlobs: [
				"dist/**.css",
				"dist/**.js",
				"dist/img/**/*"
			],

			runtimeCaching: [{
				urlPattern: /\/.*/,
				handler: "networkFirst"
			}],

			dontCacheBustUrlsMatching: /./,
			navigateFallback: "/"
		})
	)
}

if(!config.isTesting) {
	clientConfig.plugins.push(
		new webpack.optimize.CommonsChunkPlugin({
			name: "vendor",
			minChunks: function(module) {
				return module.context && module.context.indexOf("node_modules") !== -1
			}
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: "manifest"
		})
	)
}

if(config.isProduction) {
	clientConfig.plugins.push(
    new webpack.optimize.ModuleConcatenationPlugin()
	)
}

module.exports = clientConfig
