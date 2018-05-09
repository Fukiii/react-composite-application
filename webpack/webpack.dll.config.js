const path = require('path');
const webpack = require('webpack');

const config = require('./base_config');

module.exports = {
  entry: {
    vender: [
      ...config.libraries,
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dll'),
    filename: '[name].dll.js',
    library: '[name]_[hash]',
  },
  mode: 'development',
  plugins: [
    new webpack.DllPlugin({
      path: path.resolve(__dirname, 'dll/[name]-manifest.json'),
      name: '[name]_[hash]',
    }),
  ],
}