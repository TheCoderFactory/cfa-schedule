'use strict';

var AwardDiscipline = require('./award-discipline.model');

exports.register = function (socket) {

  AwardDiscipline.schema.post('save', function (doc) {
    socket.emit('AwardDiscipline:save', doc);
  });

  AwardDiscipline.schema.post('remove', function (doc) {
    socket.emit('AwardDiscipline:remove', doc);
  });

};
