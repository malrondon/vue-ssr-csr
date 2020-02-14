module.exports = () => {
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
}
