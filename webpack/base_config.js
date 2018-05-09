const path = require('path');
const url = require('url');
const cfg = require('../config')();

module.exports = {
  INDEX_HTML: 'index.html', // Name of the output index.html.
  PLAYER_HTML: 'player.html',
  PUBLIC_PATH_ASSET:'/',
  PATH_SRC: path.resolve(__dirname, '../src'),
  PATH_ROOT: path.resolve(__dirname, '..'),
  PATH_DIST: path.resolve(__dirname, '../dist'),
  PATH_NODE_MODULE: path.resolve(__dirname, '../node_modules'),
  DEBUG: cfg.client.debug,
  ANALYZE: cfg.client.analyze,
  libraries: [
    'intl',
    'lodash',
    'react',
    'react-dom',
    'redux',
    'react-redux',
    'redux-actions',
    'react-css-modules',
    'react-intl',
    'redux-saga',
  ],
};