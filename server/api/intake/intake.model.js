'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var IntakeSchema = new Schema({
  name: {type: String, required: true},
  start: {type: Date, required: true},
  end: {type: Date, required: true},
  colour: {type: String, required: true},
  image: {type: String, required: true},
  _term_id: [{type: mongoose.Schema.Types.ObjectId, ref:'Term'}]
});