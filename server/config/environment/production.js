'use strict';

module.exports = {
  ip: process.env.IP || undefined,
  mongo: {
    uri: 'mongodb://' + process.env.DASHBOARD_USERNAME + ':' + process.env.DASHBOARD_PASSWORD + '@ds017231.mlab.com:17231/cfadashboard'
  }
};
