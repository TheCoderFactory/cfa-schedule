'use strict';

var express = require('express');
var chalk = require('chalk');
var config = require('./config/environment');
var mongoose = require('mongoose');

mongoose.connect(config.mongo.uri, config.mongo.options);

var app = express();
var server = require('http').createServer(app);
var socket = require('socket.io')(server, { serveClient: true });
require('./config/sockets.js')(socket);

require('./config/express')(app);
require('./routes')(app);

server.listen(config.port, config.ip, function () {

  console.log(
    chalk.red('\nExpress server listening on port ')
    + chalk.yellow('%d')
    + chalk.red(', in ')
    + chalk.yellow('%s')
    + chalk.red(' mode.\n'),
    config.port,
    app.get('env')
  );

  if (config.env === 'development') {
    require('ripe').ready();
  }

});

if('production' == app.get('env')) {
  app.use(express.static('cfa-schedule/dist'));
}

module.exports = server;
