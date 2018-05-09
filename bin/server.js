#!/usr/bin/env node
"use strict";

let fs = require('fs');
let http = require('http');
let https = require('https');
let path = require('path');

let app = require('./app.js');

let config = require(path.join(__dirname, '..', 'config'))().server; 

let creds = {};
if (config.https.enabled) {
  let cert = fs.readFileSync(path.join(__dirname, '..', config.https.crt), 'utf8');
  let private_key = fs.readFileSync(path.join(__dirname, '..', config.https.key), 'utf8');

  creds = {
    key: private_key,
    cert: cert
  };
}

// Functions below come from Google Cloud developer documentation.

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  let port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  console.log("Listening on " + bind);
}

let port = normalizePort(process.env.PORT || config.origin_server.port);
let server;
if (config.https.enabled) {
  server = https.createServer(creds, app);
} else {
  server = http.createServer(app);
}
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
