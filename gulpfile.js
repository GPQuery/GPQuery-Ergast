'use strict';


/* Load Modules & Plugins
–––––––––––––––––––––––––––––––––––––––––––––––––– */

var path      = require('path');
var gulp      = require('gulp');
var conf      = require('./gulp.config.js');

var karma     = require('karma');


// Load Plugins Separately
// ------------------------------
var concat          = require('gulp-concat');
var del             = require('del');
var insert          = require('gulp-insert');
var jshint          = require('gulp-jshint');
var ngAnnotate      = require('gulp-ng-annotate');
var plumber         = require('gulp-plumber');
var rename          = require('gulp-rename');
var uglify          = require('gulp-uglify');
var uglifySave      = require('uglify-save-license');
var gutil           = require('gulp-util');



/* Gulp Javascript Task
–––––––––––––––––––––––––––––––––––––––––––––––––– */

gulp.task('scripts', function () {
  return gulp.src([
      path.join(conf.paths.src, '/**/*.js'),
      path.join('!' + conf.paths.src, '/app/**/*.*')
    ])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(plumber())
    .pipe(ngAnnotate())
    .pipe(concat('gpquery-ergast.js'))
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')))
    .pipe(uglify())
    .pipe(rename({extname:'.min.js'}))
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')));
});



/* Gulp Build Task
–––––––––––––––––––––––––––––––––––––––––––––––––– */

gulp.task('build', ['scripts']);






/* Unit Testing Tasks
–––––––––––––––––––––––––––––––––––––––––––––––––– */

function runTests (singleRun, done) {
  karma.server.start({
    configFile  : 'karma.conf.js',
    singleRun   : singleRun,
    autoWatch   : !singleRun
  }, function() {
    done();
  });
}

gulp.task('test', ['scripts'], function (done) {
  runTests(true, done);
});



/* Miscellaneous Tasks
–––––––––––––––––––––––––––––––––––––––––––––––––– */

gulp.task('clean', function (done) {
  del(path.join(conf.paths.dist, '/'), done);
});

gulp.task('default', ['clean'], function () {
  gulp.start('build');
});
