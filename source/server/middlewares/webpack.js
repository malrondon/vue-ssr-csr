import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

const config = require('../../../internals/webpack/client');

const compiler = webpack(config);

export default [
  webpackDevMiddleware(compiler, {
    contentBase: `http://localhost:8000`,
    quiet: true,
    noInfo: true,
    hot: true,
    inline: true,
    lazy: false,
    publicPath: config.output.publicPath,
    headers: { 'Access-Control-Allow-Origin': '*' },
  }),
  webpackHotMiddleware(compiler),
];
