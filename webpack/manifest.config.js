const merge = require('webpack-merge');
const WebpackManifestPlugin = require('webpack-manifest-plugin');

// Use ChunkManifestPlugin to minimize the size of the module names.
const manifest_config = {
  plugins: [
    new WebpackManifestPlugin(),
  ],
}

function merge_manifest(webpack_config) {
  return merge(webpack_config, manifest_config);
}

module.exports = merge_manifest;
