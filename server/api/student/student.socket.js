'use strict';

var Student = require('./student.model');

exports.register = function (socket) {

  Student.schema.post('save', function (doc) {
    socket.emit('Student:save', doc);
  });

  Student.schema.post('remove', function (doc) {
    socket.emit('Student:remove', doc);
  });

};
