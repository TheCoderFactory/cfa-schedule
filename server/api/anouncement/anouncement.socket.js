'use strict';

var Anouncement = require('./anouncement.model');

exports.register = function (socket) {

  Anouncement.schema.post('save', function (doc) {
    socket.emit('Anouncement:save', doc);
  });

  Anouncement.schema.post('remove', function (doc) {
    console.log(doc);
    socket.emit('Anouncement:remove', doc);
  });

};
