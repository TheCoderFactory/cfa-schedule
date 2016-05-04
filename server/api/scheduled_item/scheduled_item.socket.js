'use strict';

var ScheduledItem = require('./scheduled_item.model');

exports.register = function (socket) {

  ScheduledItem.schema.post('save', function (doc) {
    socket.emit('ScheduledItem:save', doc);
  });

  ScheduledItem.schema.post('remove', function (doc) {
    console.log('REMOVED SHEDULED ITEM CLIENT');
    socket.emit('ScheduledItem:remove', doc);
  });

};
