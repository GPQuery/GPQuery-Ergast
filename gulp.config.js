

// Load gulp-util Plugin
// ------------------------------

var gutil    = require('gulp-util');


// Configure Project Paths
// ------------------------------

exports.paths = {
  src   : 'src',
  dist  : 'dist',
  test  : 'test',
  node  : 'node_modules'
};


// Gulp Error Handler
// ------------------------------

exports.errorHandler = function(title) {
  'use strict';

  return function(error) {

    gutil.log(
      gutil.colors.red('[' + title + ']'),
      error.toString());

    this.emit('end');

  };

};
