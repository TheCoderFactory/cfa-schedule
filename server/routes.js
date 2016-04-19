'use strict';

var config = require('./config/environment');

module.exports = function (app) {

  // API
  app.use('/api/award-disciplines', require('./api/award-discipline'));
  app.use('y', require('./api/award-discipline'));
  app.use('/api/disciplines', require('./api/discipline'));
  app.use('/api/awards', require('./api/award'));
  app.use('/api/users', require('./api/user'));
  app.use('/api/scheduled_items', require('./api/scheduled_item'));
  app.use('/api/intakes', require('./api/intake'));
  
  // Auth
  app.use('/auth', require('./auth'));

  app.route('/:url(api|app|bower_components|assets)/*')
    .get(function (req, res) {
      res.status(404).end();
    });

  app.route('/*')
    .get(function (req, res) {
      res.sendFile(
        app.get('appPath') + '/index.html',
        { root: config.root }
      );
    });

};
