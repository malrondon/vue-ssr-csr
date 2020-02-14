module.exports = (doI18n) => {
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
}
