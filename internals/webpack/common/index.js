const path = require('path');

const { NODE_ENV } = process.env;
const ISDEV = NODE_ENV === 'development';

const preRule = require('./pre-rule');
const babelRule = require('./babel-rule');
const vueRule = require('./vue-rule');
const cssModulesRule = require('./css-modules-rule');
const cssRule = require('./css-rule');
const fileRule = require('./file-rule');
const i18n = require('./i18n');

i18n.init();

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
    cssRule,
    vueRule() {
      return vueRule(i18n.doI18n)
    },
    cssModulesRule() {
      return cssModulesRule(ISDEV, cssScopedName);
    },
    fileRule() {
      return fileRule(isClient, publicPath)
    }
  };
};

module.exports = commonConfig;
