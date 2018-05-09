const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");

const config = require('./base_config.js');

const config_prod = {
  mode: 'production',
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
  },
  devtool: 'hidden-source-map',
  module: {
    rules: [
      {
        test: /\.less$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 3,
              localIdentName: '[local]_[hash:base64:5]',
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: false,
              plugins: function () {
                return [
                  require('autoprefixer')({browsers: [
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
          {
            loader: 'less-loader',
            options: {
              sourceMap: false,
            }
          },
          'style-loader',
        ],
      },
      {
        test: /\.css$/,
          use: ['css-loader', 'style-loader'],
      },
      {
        test: /\.png$/,
        use: `url-loader?limit=10&mimetype=image/png&name=asset/[name]_[hash:5].[ext]&publicPath=${config.PUBLIC_PATH_ASSET}`,
        exclude: /(node_modules|libs)/,
      },
      {
        test: /\.svg$/,
        use: `url-loader?limit=10&mimetype=image/svg+xml&name=asset/[name]_[hash:5].[ext]&publicPath=${config.PUBLIC_PATH_ASSET}`,
        exclude: /(node_modules|libs)/,
      },
      {
        test: /\.(jpg|gif|ico)$/,
        use: `url-loader?limit=10&name=asset/[name]_[hash:5].[ext]&publicPath=${config.PUBLIC_PATH_ASSET}`,
        exclude: /(node_modules|libs)/,
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(config.PATH_DIST, {
      root: config.PATH_ROOT,
    }),

    // new WebpackMd5Hash(),
    // new webpack.HashedModuleIdsPlugin(),
    // Order is important, runtime should be the last commons chunk.
    // new ExtractTextPlugin({
    //   filename: '[name]_[contenthash:5].css',
    //   allChunks: true,
    //   ignoreOrder: true,
    // }),

    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: {removeAll: true } },
      canPrint: true
    }),

    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new HtmlWebpackPlugin({
      filename: config.INDEX_HTML,
      chunks: ['boxv2', 'commons', 'runtime'],
      favicon: 'favicon.ico',
      template: path.join(config.PATH_ROOT, 'src/index/index.ejs'),
      hash: true,
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        html5: true,
        minifyCSS: true,
        removeComments: true,
        removeEmptyAttributes: true,
      }
    }),
    new HtmlWebpackPlugin({
      filename: config.PLAYER_HTML,
      chunks: ['palyer', 'commons', 'runtime'],
      favicon: 'favicon.ico',
      template: path.join(config.PATH_ROOT, 'src/player/index.ejs'),
      hash: true,
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        html5: true,
        minifyCSS: true,
        removeComments: true,
        removeEmptyAttributes: true,
      }
    }),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    }),
  ]
};

function merge_prod(webpack_config) {
  return merge.smart(webpack_config, config_prod);
}

module.exports = merge_prod;
