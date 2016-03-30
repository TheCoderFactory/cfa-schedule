'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TermSchema = new Schema({
  start: {type: Date, required: true},
  end: {type: Date, required: true}
});