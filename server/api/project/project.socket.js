'use strict';

var Project = require('./project.model');

exports.register = function (socket) {

  Project.schema.post('save', function (doc) {
    socket.emit('Project:save', doc);
  });

  Project.schema.post('remove', function (doc) {
    socket.emit('Project:remove', doc);
  });

};
