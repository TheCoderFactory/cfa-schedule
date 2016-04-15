'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AwardDisciplineSchema = new Schema({
  name: String
});

module.exports = mongoose.model('AwardDiscipline', AwardDisciplineSchema);
