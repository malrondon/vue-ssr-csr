module.exports = (isClient, publicPath) => {
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
}
