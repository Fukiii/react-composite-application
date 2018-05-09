const merge = require('webpack-merge');
const HappyPack = require('happypack');

const config = require('./base_config');
const happypack_thread_pool = HappyPack.ThreadPool({size: 4});

const happypack_config = {
  plugins: [
    new HappyPack({
      id: 'babel',
      threadPool: happypack_thread_pool,
      loaders: ['babel-loader'],
    }),
    new HappyPack({
      id: 'ts',
      threadPool: happypack_thread_pool,
      loaders: [
        {
          path: 'ts-loader',
          happyPackMode: true,
        },
      ],
    }),
    new HappyPack({
      id: 'css',
      threadPool: happypack_thread_pool,
      loaders: ['css-loader'],
    }),
    new HappyPack({
      id: 'css_module',
      threadPool: happypack_thread_pool,
      loaders: [
        {
          path: 'css-loader',
          query: {
            modules: true,
            importLoaders: 3,
            localIdentName: '[local]_[hash:base64:5]',
          }
        }
      ],
    }),
    new HappyPack({
      id: 'less',
      threadPool: happypack_thread_pool,
      loaders: [
        {
          path: 'less-loader',
          query: {
            sourceMap: false
          }
        }
      ],
    }),
    new HappyPack({
      id: 'json',
      threadPool: happypack_thread_pool,
      loaders: ['json-loader'],
    }),
  ],
}

function merge_happypack(webpack_config) {
  return merge(webpack_config, happypack_config);
}

module.exports = merge_happypack;