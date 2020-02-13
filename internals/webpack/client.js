const path = require('path');
const webpack = require('webpack');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const StatsWebpackPlugin = require('stats-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const VueSSRClientPlugin = require("vue-server-renderer/client-plugin");
const StringReplacePlugin = require("string-replace-webpack-plugin");
const HTMLPlugin = require('html-webpack-plugin');

const configVars = require('./config');
const webpackCommon = require('./common');

const isAnalyze = process.env.ANALYZE_MODE === 'enabled';

const commonConfig = webpackCommon('client');

const { NODE_ENV } = process.env;
const ISDEV = NODE_ENV === 'development';

const config = {
  name: 'client',
  target: 'web',
  mode: commonConfig.mode,
  devtool: commonConfig.devtool,
  resolve: commonConfig.resolve,
  // for more about performance hints
  // @see: https://webpack.js.org/configuration/performance/#performance
  performance: {
    maxEntrypointSize: 400000,
    maxAssetSize: 400000,
  },
  entry: [
    ...(ISDEV
      ? [
          'eventsource-polyfill', // used for IE's hot reloading
          'react-hot-loader/patch',
          'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true',
        ]
      : []),
    path.resolve(__dirname, `../../source/client`, 'index'),
  ],
  output: {
    path: path.resolve(__dirname, '../../dist'),
    publicPath: commonConfig.publicPath,
    filename: 'main.min.js',
    chunkFilename: '[id].js',
  },
  optimization: {
    // Prevent Duplication
    splitChunks: {
      chunks: 'all',
    },
    // can provide uglify-js options for more controls
    // @see: https://webpack.js.org/plugins/uglifyjs-webpack-plugin/
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: { ecma: 5, compress: { keep_fnames: true }, warnings: false, mangle: { keep_fnames: true } },
        parallel: 4,
      }),
      new OptimizeCssAssetsPlugin(),
    ],
  },
  module: {
    rules: [
      ...commonConfig.preRule(),
      ...commonConfig.babelRule(),
      ...commonConfig.vueRule(),
      ...commonConfig.fileRule(),
      ...commonConfig.cssModulesRule(),
      ...commonConfig.cssRule(),
    ],
  },
  plugins: [
		new VueSSRClientPlugin(),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
			"process.env.VUE_ENV": "'client'"
		}),
		new HTMLPlugin({
			template: "source/shared/index.template.html"
		}),
    new StringReplacePlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
    new MiniCssExtractPlugin({
      filename: 'main.min.css',
      chunkFilename: '[id].css',
    }),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
    new webpack.EnvironmentPlugin({
      APP_BROWSER: true,
      ...configVars.env,
    }),
  ].concat(
    ISDEV
      ? [
        new webpack.HotModuleReplacementPlugin(),
        new FriendlyErrorsPlugin()
      ]
      : [
          new StatsWebpackPlugin('stats.json'),
          // for more webpack bundle analyzer options,
          // @see: https://github.com/webpack-contrib/webpack-bundle-analyzer#options-for-plugin
          new BundleAnalyzerPlugin({
            analyzerMode: isAnalyze ? 'server' : 'disabled',
            openAnalyzer: isAnalyze,
          }),
        ]
  ),
  externals: {
    window: 'window',
  },
};

module.exports = config;
