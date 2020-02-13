const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StringReplacePlugin = require('string-replace-webpack-plugin');

const Vue = require("vue");
const VueI18n = require("vue-i18n");

const { NODE_ENV } = process.env;
const ISDEV = NODE_ENV === 'development';

const config = require("../../config");

const messages = {
	main:	require(`../../languages/${config.language.filename}`),
	fallback: config.fallbackLanguage ? require(`../../languages/${config.fallbackLanguage.filename}`) : null
}

Vue.use(VueI18n);

const i18n = new VueI18n({
	locale: "main",
	fallbackLocale: messages.fallback ? "fallback" : null,
	messages
});

const doI18n = StringReplacePlugin.replace({
	replacements: [{
		pattern: /\$ts\((.+)\)/g,
		replacement: function(fullMatch, params, offset, string) {
			params = params.split(",").map((p) => eval(p))
			if (i18n.tc(...params) === params[0]) {
				if (config.isProduction) {
					throw new Error(`[i18n] Translation key "${params[0]}" does not exist`)
				} else {
					console.warn(`[i18n] Translation key "${params[0]}" does not exist`)
				}
			}
			return i18n.tc(...params)
		}
	}]
});

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
      path: path.resolve(__dirname, '../../dist'),
      filename: `[name].min.js`,
      chunkFilename: `chunk.min.js`,
      publicPath: '/',
    },
    resolve: {
      extensions: ['.js', '.vue', '.scss', '.css'],
    },
    preRule() {
      return [
        {
          enforce: 'pre',
          test: /\.(vue|js)$/,
          exclude: /node_modules|internals|config/,
          use: {
            loader: 'eslint-loader',
          },
        },
      ];
    },
    babelRule() {
      return [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [{ loader: 'babel-loader' }],
        },
      ];
    },
    vueRule() {
      return [
        {
          test: /\.vue$/,
          use: [{
            loader: 'vue-loader',
            options: {
              preLoaders: {
                html: doI18n
              },
              preserveWhitespace: false,
              postcss: [
                require("autoprefixer")()
              ]
            }
          }],
        },
      ];
    },
    cssModulesRule() {
      const modules = true;
      const localIdentName = cssScopedName;
      const sourceMap = !!ISDEV;

      return [
        {
          test: /\.scss$/,
          include: [path.resolve(__dirname, '../../source')],
          use: isClient
            ? [
                'css-hot-loader',
                MiniCssExtractPlugin.loader,
                {
                  loader: 'css-loader',
                  options: {
                    modules,
                    localIdentName,
                    sourceMap,
                    importLoaders: 2,
                  },
                },
                {
                  loader: 'postcss-loader',
                  options: {
                    plugins: () => [require('autoprefixer')],
                  },
                },
                {
                  loader: 'sass-loader',
                  options: { sourceMap },
                },
              ]
            : [
                {
                  loader: 'css-loader/locals',
                  options: {
                    modules,
                    localIdentName,
                  },
                },
                'sass-loader',
              ],
        },
      ];
    },
    cssRule() {
      return [
        {
          test: /\.css$/,
          include: [path.resolve(__dirname, '../../node_modules/<package>/dist/')],
          use: isClient
            ? [
                'css-hot-loader',
                MiniCssExtractPlugin.loader,
                {
                  loader: 'css-loader',
                },
              ]
            : [
                {
                  loader: 'css-loader/locals',
                },
              ],
        },
      ];
    },
    fileRule() {
      const loaders = options => [
        {
          loader: 'url-loader',
          options: Object.assign(
            {
              publicPath,
              fallback: 'file-loader',
              limit: 10240,
              emitFile: !!isClient,
            },
            options
          ),
        },
      ];

      return [
        {
          test: /\.(svg|png|jpe?g|gif|ico)(\?.*)?$/i,
          use: loaders({ name: '[name].[ext]' }),
        },
        {
          test: /\.(eot|ttf|woff2?)(\?.*)?$/i,
          use: loaders({ name: '[name].[ext]' }),
        },
      ];
    },
  };
};

module.exports = commonConfig;
