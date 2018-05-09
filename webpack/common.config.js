const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const config = require('./base_config.js');
const DIST_PATH = path.resolve(__dirname, '../dist');
const dev_mode = process.env.NODE_ENV !== 'production';

config_common = {
  entry: {
    boxv2: [
      path.join(config.PATH_ROOT, 'src/index/index.tsx'),
    ],
    player: [
      path.join(config.PATH_ROOT, 'src/player/index.tsx'),
    ],
  },
  output: {
    path: DIST_PATH,
    publicPath: '/',
  },
  resolve: {
    extensions: ['.webpack.js', '.ts', '.tsx', '.js'],
    modules: [
      path.join(config.PATH_ROOT, 'src/assets'),
      'node_modules',
    ],
    alias: {
      src: config.PATH_SRC,
      root: config.PATH_ROOT,
    },
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        use: ["source-map-loader"],
        include: /(heart|cmblockly)/
      },
      {
        test: /\.(ts|tsx)?$/,
        use: [
          'babel-loader',
          'ts-loader',
        ],
        exclude: /(node_modules)/,
      }
    ],
  },
  stats: 'minimal',
  context: config.PATH_ROOT,
  optimization: {
    namedModules: true,
    splitChunks: {
      cacheGroups: {
        commons: {
          name: "commons",
          chunks: "initial",
          minChunks: 2
        }
      }
    },
    noEmitOnErrors: true,
    runtimeChunk: {
      name: 'runtime'
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      '__DEV__': dev_mode,
      'DEBUG': config.DEBUG,
    })
  ]
};

if (config.ANALYZE) {
  config_common.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = config_common;