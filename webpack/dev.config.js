const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = require('./base_config');

const config_dev = {
  entry: {
    boxv2: [
      "webpack-hot-middleware/client?reload=true&timeout=2000&overlay=false"
    ],
    player: [
      "webpack-hot-middleware/client?reload=true&timeout=2000&overlay=false"
    ],
  },
  output: {
    filename: '[name].js',
  },
  mode: "development",
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(ts|tsx)?$/,
        use: [
          // Use tslint-loader after we fix the current style
          {
            loader: 'tslint-loader',
            options: {
              emitErrors: true,
            }
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        exclude: /(node_modules)/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 3,
              localIdentName: '[local]_[hash:base64:5]',
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: function () {
                return [
                  require('autoprefixer')({ browsers: [
                    'Chrome >= 35',
                    'Firefox >= 38',
                    'Edge >= 12',
                    'Explorer >= 10',
                    'iOS >= 8',
                    'Safari >= 8',
                    'Android 2.3',
                    'Android >= 4',
                    'Opera >= 12',
                  ]}),
                ];
              },
            },
          },
          'resolve-url-loader',
          'less-loader',
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpg|gif|ico|png|svg)$/,
        use: `url-loader?limit=10&name=asset/[name]_[hash:5].[ext]`,
        exclude: /(node_modules)/,
      },
      {
        test: /\.(woff|eot|ttf)\??.*$/i,
        loader: 'url-loader?limit=1000&name=fonts/[name].[hash].[ext]',
        exclude: /(node_modules)/,
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.DllReferencePlugin({
    //   context: config.PATH_ROOT,
    //   manifest: require('./dll/vender-manifest.json'),
    // }),
    // new CopyWebpackPlugin([{
    //   from: path.resolve(__dirname, 'dll'),
    //   to: 'dll',
    // }]),
    new HtmlWebpackPlugin({
      filename: config.INDEX_HTML,
      chunks: ['boxv2', 'commons', 'runtime'],
      favicon: 'favicon.ico',
      template: path.join(config.PATH_ROOT, 'src', 'index', 'index.ejs'),
    }),
    new HtmlWebpackPlugin({
      filename: config.PLAYER_HTML,
      chunks: ['player', 'commons', 'runtime'],
      favicon: 'favicon.ico',
      template: path.join(config.PATH_ROOT, 'src', 'player', 'index.ejs'),
    }),
  ],
  devtool: 'cheap-module-inline-source-map',
}

function merge_config_dev(webpack_config) {
  return merge.smartStrategy({
    entry: 'prepend',
  })(webpack_config, config_dev);
}

module.exports = merge_config_dev;