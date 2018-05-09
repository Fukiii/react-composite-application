"use strict";
var _ = require('lodash');
var fs = require('fs');
var path = require('path');

var cfg_dir = path.join(__dirname);
var cfg_env_var = 'BOXV2';

var empty_config = {
  both: {},
  server: {},
  client: {},
};

function generate_cfg() {
  var default_config_path = path.join(cfg_dir, 'default.json');
  var local_config_path = path.join(cfg_dir, 'local.json');
  var local_config = {};
  var env_config = {};

  if (file_exists(local_config_path)) {
    local_config = require(local_config_path).runtime;
  }
  if (_.has(process.env, cfg_env_var)) {
    var env_cfg_path = process.env[cfg_env_var];
    if (file_exists(env_cfg_path)) {
      env_config = require(env_cfg_path).runtime;
    } else {
      console.error("\nConfiguration file specified by env var " + cfg_env_var + " = " + env_cfg_path + " does not exist.\n");
      return null;
    }
  }

  var default_config = require(default_config_path).runtime;
  var mixed_config = _.defaultsDeep(
    {}, // apply modifications to this new dict
    env_config,
    local_config,
    default_config,
    empty_config,
  ); // ensure all necessary sub-dicts exist

  return separate_client_server(mixed_config);
}

function separate_client_server(mixed_config) {
  var client_config = _.defaultsDeep(
    {},
    mixed_config.client,
    mixed_config.both);
  var server_config = _.defaultsDeep(
    {},
    mixed_config.server,
    mixed_config.both);
  return {
    client: client_config,
    server: server_config,
  };
}

function file_exists(path) {
  try {
    fs.lstatSync(path);
    return true;
  } catch (e) {
    return false;
  }
}

module.exports = generate_cfg;
