module.exports = () => {
  return [
    {
      test: /\.vue$/,
      use: [{
        loader: 'vue-loader',
        options: {
          preserveWhitespace: false,
          postcss: [
            require("autoprefixer")()
          ]
        }
      }],
    },
  ];
}
