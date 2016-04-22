'use strict';

var config = require('./config/environment');
var auth = require('./auth/auth.service');


module.exports = function (app) {

  // API
  app.use('/api/award-disciplines', auth.isAuthenticated(), require('./api/award-discipline'));
  app.use('/api/disciplines', auth.isAuthenticated(), require('./api/discipline'));
  app.use('/api/awards', auth.isAuthenticated(), require('./api/award'));
  app.use('/api/users', auth.isAuthenticated(), auth.adminOnly, require('./api/user'));
  app.use('/api/scheduled_items', require('./api/scheduled_item'));
  app.use('/api/intakes', auth.isAuthenticated(), require('./api/intake'));
  app.use('/api/registrations', auth.isAuthenticated(), require('./api/registration'));
  app.use('/api/anouncements', auth.isAuthenticated(), require('./api/anouncement'));
  
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
