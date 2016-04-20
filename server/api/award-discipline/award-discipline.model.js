'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('lodash');

var AwardDisciplineSchema = new Schema({
  _registration: {
      type: Schema.ObjectId,
      ref: 'Registration',
      // required: true
  },
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