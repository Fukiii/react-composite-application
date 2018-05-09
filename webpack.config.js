const merge = require('webpack-merge');

const config_common = require('./webpack/common.config');
// const merge_happypack = require('./webpack/happypack.config');
const merge_manifest = require('./webpack/manifest.config');

let webpack_config = config_common;
// // webpack_config = merge_happypack(webpack_config);

if (process.env.NODE_ENV === 'production') {
  const merge_prod = require('./webpack/prod.config.js');
  webpack_config = merge_prod(webpack_config);
} else {
  const merge_dev = require('./webpack/dev.config.js');
  webpack_config = merge_dev(webpack_config);
}
// webpack_config = merge_manifest(webpack_config);

module.exports = webpack_config;
