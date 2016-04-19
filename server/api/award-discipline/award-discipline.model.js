'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AwardDisciplineSchema = new Schema({
  _award: {
      type: Schema.ObjectId,
      ref: 'Award',
      required: true
  },
  _discipline: {
      type: Schema.ObjectId,
      ref: 'Discipline',
      required: true
  }
});

module.exports = mongoose.model('AwardDiscipline', AwardDisciplineSchema);