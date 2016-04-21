'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DisciplineSchema = new Schema({
  name: {type: String, required: true},
  description: String,
  isEditing: Boolean
});

module.exports = mongoose.model('Discipline', DisciplineSchema);
