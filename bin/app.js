var path = require('path')
var express = require('express')
var compression = require('compression')
var app = express()
let router = express.Router();
var proxy = require('http-proxy-middleware');

let _config = require('../config/index.js')();
let webpack_config = require(path.join(__dirname, '../webpack/base_config'));
let index_path = path.join(__dirname, '../dist/index.html');
let player_path = path.join(__dirname, '../dist/player.html');
let error_path = path.join(__dirname, '../dist/error.html');
var compiler;

app.use(compression());

app.get('/config', function(req, res){
  res.json(_config.runtime);
});
app.get('/MP_verify_3HsPsak95uz0hzGm.txt', function(req, res){
  res.send('3HsPsak95uz0hzGm')
});
app.get('/MP_verify_7jOzFkprGMCraV8d.txt', function(req, res){
  res.send('7jOzFkprGMCraV8d')
});

if (process.env.NODE_ENV === 'development') {
  var webpack = require('webpack');
  let webpackConfig = require('../webpack.config');
  compiler = webpack(webpackConfig);
  app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath
  }));
  app.use(require("webpack-hot-middleware")(compiler));

  app.use('/', (req, res, next) => {
    if (req.url.indexOf('/p') < 0) {
      dev_send_html(res, webpack_config.INDEX_HTML);
    } else {
      next();
    }
  })
  app.get('/p', (req, res) => {
    dev_send_html(res, webpack_config.PLAYER_HTML);
  })
} else {
  app.use('/', (req, res, next) => {
    if (req.url.indexOf('/p') < 0) {
      res.sendFile(index_path);
    } else {
      next();
    }
  })
  app.get('/p', (req, res) => {
    res.sendFile(player_path);
  })
}

async function dev_send_html(res, html) {
  let file_name = path.join(compiler.outputPath, html);
  await (new Promise((resolve, reject) => {
    compiler.outputFileSystem.readFile(file_name, (err, result) => {
      if (err) {
        reject(err);
      }
      res.set('Content-Type', 'text/html');
      res.send(result);
      resolve();
    });
  }));
}

app.use(router);
app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});

module.exports = app;