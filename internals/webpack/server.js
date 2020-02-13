const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const VueSSRServerPlugin = require("vue-server-renderer/server-plugin");
const StringReplacePlugin = require("string-replace-webpack-plugin");

const configVars = require('./config');
const webpackCommon = require('./common');

const commonConfig = webpackCommon('server');

const config = {
  name: 'server',
  target: 'node',
  mode: commonConfig.mode,
  devtool: commonConfig.devtool,
  resolve: commonConfig.resolve,
  externals: nodeExternals({
    whitelist: /\.css$/,
  }),
  entry: {
    server: ['regenerator-runtime/runtime', path.resolve(__dirname, `../../source/server`, 'entry.js')],
  },
  output: {
    path: path.resolve(__dirname, '../../dist'),
    libraryTarget: 'commonjs2',
    filename: 'server.min.js',
  },
  optimization: {
    // Prevent Duplication
    splitChunks: {
      chunks: 'all',
    },
  },
  node: {
    __filename: false,
    __dirname: false,
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
    new webpack.DefinePlugin({
			"process.env.VUE_ENV": "'server'"
		}),
    new VueLoaderPlugin(),
    new VueSSRServerPlugin(),
    new StringReplacePlugin(),
    new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
    new webpack.EnvironmentPlugin({
      ...configVars.env,
    }),
  ],
};

module.exports = config;
