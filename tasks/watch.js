'use strict';

/**
 * Watch files, and do things when they changes.
 * Recompile scss if needed.
 * Reinject files
 */

var gulp       = require('gulp');
var bsync      = require('browser-sync');
var watch      = require('gulp-watch');
var inject     = require('gulp-inject');
var plumber    = require('gulp-plumber');
var sass       = require('gulp-sass');
var bowerFiles = require('main-bower-files');

var toInject   = require('./config/filesToInject');
var toExclude  = require('./config/bowerFilesToExclude');

module.exports = function () {

  gulp.watch('bower.json', function () {
    gulp.src('client/index.html')
      .pipe(inject(gulp.src(bowerFiles(), { read: false }), {
        name: 'bower',
        relative: 'true',
        ignorePath: toExclude
      }))
      .pipe(gulp.dest('client'))
      .pipe(bsync.reload({ stream: true }));
  });

  watch([
    'client/styles/**/*.scss',
    'client/views/**/*.scss',
    'client/directives/**/*.scss',
    'client/views/student_dashboard/student_dashboard.scss'
  ], function () {
    gulp.src('client/styles/app.scss')
      .pipe(plumber())
      .pipe(sass())
      .pipe(gulp.dest('client/styles/css'))
      .pipe(bsync.reload({ stream: true }));
  });

  var coreFiles = [
    'client/views/**/*.html',
    'client/views/**/*.js',
    '!client/views/**/*.scss',
    '!client/views/**/*.spec.js',
    '!client/views/**/*.e2e.js',
    'client/directives/**/*.html',
    'client/directives/**/*.js',
    '!client/directives/**/*.spec.js',
    'client/services/**/*.js',
    '!client/services/**/*.spec.js',
    'client/animations/*.js',
    'client/filters/**/*.js',
    '!client/filters/**/*.spec.js'
  ];

  var lastInjection = Date.now();

  watch(coreFiles, { events: ['add', 'unlink'] }, function () {
    if (Date.now() - lastInjection < 100) { return; }
    lastInjection = Date.now();
    gulp.src('client/index.html')
      .pipe(inject(gulp.src(toInject), { relative: true }))
      .pipe(gulp.dest('client'));
  });

  watch(coreFiles, bsync.reload);
  watch(['client/index.html', 'client/app.js'], bsync.reload);

};
