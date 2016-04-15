'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StudentAwardSchema = new Schema({
  name: String
});

module.exports = mongoose.model('StudentAward', StudentAwardSchema);
