const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = (ISDEV, isClient, cssScopedName) => {
  const modules = true;
  const localIdentName = cssScopedName;
  const sourceMap = !!ISDEV;

  return [
    {
      test: /\.scss$/,
      include: [path.resolve(__dirname, '../../../source')],
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
}
