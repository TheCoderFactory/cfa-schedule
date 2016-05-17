'use strict';

var crypto = require('crypto');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('lodash');

var UserSchema = new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  image: String,
  admin: {type: Boolean, required: true},
  _registrations: [{type: Schema.Types.ObjectId, ref: 'Registration', required: false}],
  email: String,
  altEmail: String,
  passwordHash: { type: String, select: false },
  salt: { type: String, select: false }
});

/**
 * Virtuals
 */

UserSchema
  .virtual('password')
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.passwordHash = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

/**
 * Validations
 */

UserSchema
  .path('email')
  .validate(function (value, respond) {
    var self = this;
    this.constructor.findOne({ email: value }, function (err, user) {
      if (err) { throw err; }
      if (user) {
        if (self.id === user.id) { return respond(true); }
        return respond(false);
      }
      respond(true);
    });
  }, 'email already used');

/**
 * Methods
 */

UserSchema.methods = {

  /**
   * Authenticate
   *
   * @param {String} password
   * @return {Boolean}
   */
  authenticate: function (password) {
    return this.encryptPassword(password) === this.passwordHash;
  },

  /**
   * Make salt
   *
   * @return {String}
   */
  makeSalt: function () {
    return crypto.randomBytes(16).toString('base64');
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   */
  encryptPassword: function (password) {
    if (!password || !this.salt) { return ''; }
    var salt = new Buffer(this.salt, 'base64');
    return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
  },

  // check intake registration
  registrationCheck: function (intakeIdForCheck) {
    var registrations = this._registrations.toObject();
    console.log(registrations);
    if (registrations.length < 1) {return false; }
    var intakeIds = _.map(registrations, '_intake'); 
    console.log(intakeIds);
    console.log(intakeIdForCheck);
    return _.some(intakeIds, function (intakeId) {
      if(intakeId == intakeIdForCheck){
        return true;
      }
    });
  }

};

module.exports = mongoose.model('User', UserSchema);
