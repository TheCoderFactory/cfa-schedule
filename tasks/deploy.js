'use strict';

/**
 * Control things.
 */

var gulp        = require('gulp');
var fs          = require('fs');
var _           = require('lodash');
var async       = require('async');
var jshint      = require('gulp-jshint');
var jscs        = require('gulp-jscs');
var jscsStylish = require('gulp-jscs-stylish');

exports.test = function () {
    // function() {
        rsyncPaths = [path.dist, 'lang', 'lib', 'templates', './*.php', './style.css' ];
        rsyncConf = {
            progress: true,
            incremental: true,
            relative: true,
            emptyDirectories: true,
            recursive: true,
            clean: true,
            exclude: [],
          };
        if (argv.staging) {
            rsyncConf.hostname = ''; // hostname
            rsyncConf.username = ''; // ssh username
            rsyncConf.destination = ''; // path where uploaded files go
        } else if (argv.production) {
            rsyncConf.hostname = ''; // hostname
            rsyncConf.username = ''; // ssh username
            rsyncConf.destination = ''; // path where uploaded files go
        // Missing/Invalid Target  
        } else {
            throwError('deploy', gutil.colors.red('Missing or invalid target'));
        }
        // Use gulp-rsync to sync the files 
        return gulp.src(rsyncPaths)
        .pipe(gulpif(
          argv.production, 
          prompt.confirm({
            message: 'Heads Up! Are you SURE you want to push to PRODUCTION?',
            default: false
          })
        ))
        .pipe(rsync(rsyncConf));

        function throwError(taskName, msg) {
        throw new gutil.PluginError({
            plugin: taskName,
            message: msg
          });
        }
    // }
}