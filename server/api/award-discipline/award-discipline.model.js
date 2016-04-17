'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AwardDisciplineSchema = new Schema({
  name: {type: String, required: true},
  award: {
      type: Schema.ObjectId,
      ref: 'Award'
  },
  discipline: {
      type: Schema.ObjectId,
      ref: 'Discipline'
  }
});

module.exports = mongoose.model('AwardDiscipline', AwardDisciplineSchema);
