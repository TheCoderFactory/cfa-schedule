'use strict';

module.exports = {
  ip: process.env.IP || undefined,
  mongo: {
    uri: process.env.MONGODB_URI
  }
};
