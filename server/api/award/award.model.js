'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AwardSchema = new Schema({
  name: {type: String, required: true},
  value: {type: Number, required: true}
});

module.exports = mongoose.model('Award', AwardSchema);
