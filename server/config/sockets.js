'use strict';

module.exports = function (io) {

  io.on('connection', function (socket) {

    socket.connectDate = new Date();
    socket.ip = (socket.handshake.address) ? socket.handshake.address : null;

    // sockets inserts
    require('../api/award-discipline/award-discipline.socket.js').register(socket);
    require('../api/scheduled_item/scheduled_item.socket.js').register(socket);
    require('../api/anouncement/anouncement.socket.js').register(socket);

    socket.on('disconnect', function () {
      console.log('[%s] %s disconnected.', new Date().toUTCString(), socket.ip);
    });

    console.log('[%s] %s logged.', socket.connectDate.toUTCString(), socket.ip);

  });
};
