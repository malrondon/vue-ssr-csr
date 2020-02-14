const path = require('path');

const preRule = require('./pre-rule');
const babelRule = require('./babel-rule');
const vueRule = require('./vue-rule');
const cssModulesRule = require('./css-modules-rule');
const cssRule = require('./css-rule');
const fileRule = require('./file-rule');

const { NODE_ENV } = process.env;
const ISDEV = NODE_ENV === 'development';

const commonConfig = target => {
  const isClient = target === 'client';
  const devtool = ISDEV ? 'cheap-module-source-map' : 'source-map';
  const cssScopedName = '[name]_[local]_[hash:base64:5]';
  const publicPath = '/';

  return {
    devtool,
    publicPath,
    mode: ISDEV ? 'development' : 'production',
    output: {
      path: path.resolve(__dirname, '../../../dist'),
      filename: `[name].min.js`,
      chunkFilename: `chunk.min.js`,
      publicPath: '/',
    },
    resolve: {
      extensions: ['.js', '.vue', '.scss', '.css'],
    },
    preRule,
    babelRule,
    vueRule,
    cssRule() {
      return cssRule(isClient);
    },
    cssModulesRule() {
      return cssModulesRule(ISDEV, isClient, cssScopedName);
    },
    fileRule() {
      return fileRule(isClient, publicPath)
    }
  };
};

module.exports = commonConfig;
