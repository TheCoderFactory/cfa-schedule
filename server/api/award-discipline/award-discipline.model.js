'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AwardDisciplineSchema = new Schema({
  award: {
      type: Schema.ObjectId,
      ref: 'Award',
      required: true
  },
  discipline: {
      type: Schema.ObjectId,
      ref: 'Discipline',
      required: true
  }
});

module.exports = mongoose.model('AwardDiscipline', AwardDisciplineSchema);