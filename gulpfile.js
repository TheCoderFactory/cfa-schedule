'use strict';

var gulp = require('gulp');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

gulp.task('default',    ['serve']);
gulp.task('nodemon',    ['watch'],    require('./tasks/serve').nodemon);
gulp.task('serve',      ['nodemon'],  require('./tasks/serve').bsync);
gulp.task('watch',      ['inject'],   require('./tasks/watch'));
gulp.task('inject',     ['sass'],     require('./tasks/inject'));
gulp.task('sass',                     require('./tasks/sass'));
gulp.task('preview',    ['build'],    require('./tasks/preview'));
gulp.task('build',                    require('./tasks/build'));
gulp.task('bump',       ['version'],  require('./tasks/chore').bump);
gulp.task('version',                  require('./tasks/chore').version);
gulp.task('test',                     require('./tasks/test').test);
gulp.task('sassdoc',                  require('./tasks/doc').sassdoc);
