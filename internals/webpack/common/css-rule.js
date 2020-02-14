const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = () => {
  return [
    {
      test: /\.css$/,
      include: [path.resolve(__dirname, '../../../node_modules/<package>/dist/')],
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
  ]
}
