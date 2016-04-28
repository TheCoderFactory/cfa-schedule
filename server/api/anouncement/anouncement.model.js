'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AnouncementSchema = new Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  type: {type: String, required: true},
  _intakes: [{type:Schema.Types.ObjectId, ref: 'Intake', required: false}]
},
{
  timestamps: true
}
);


module.exports = mongoose.model('Anouncement', AnouncementSchema);