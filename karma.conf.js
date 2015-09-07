//
// https://raw.githubusercontent.com/MrOrz/SeeSS/master/test/karma.conf.js
'use strict';



/* Load Modules
–––––––––––––––––––––––––––––––––––––––––––––––––– */

var path      = require('path');

var conf      = require('./gulp.config.js');



/* Export Function
–––––––––––––––––––––––––––––––––––––––––––––––––– */

module.exports = function(config) {

  var configuration = {


    // Testing Frameworks
    // ------------------------------
    // https://npmjs.org/browse/keyword/karma-adapter
    frameworks : [
      'jasmine',
      'angular-filesort'
    ],


    // Browser Launchers
    // ------------------------------
    // https://npmjs.org/browse/keyword/karma-launcher
    browsers : [
      'PhantomJS'
    ],

    customLaunchers: {
      Chrome_travis_ci : {
        base  : 'Chrome',
        flags : ['--no-sandbox']
      }
    }


    // Karma Plugins
    // ------------------------------
    plugins : [
      'karma-phantomjs-launcher',
      'karma-angular-filesort',
      'karma-jasmine'
    ],
    angularFilesort : {
      whitelist : [
        path.join(conf.paths.src, '/**/!(*.html|*.spec|*.mock).js')
      ]
    },

    // Files to load into Browser
    // ------------------------------
    files : [
      path.join(conf.paths.node,  '/angular/angular.js'),
      path.join(conf.paths.src,   '/**/*.js'),
      path.join(conf.paths.test,  '/**/*.spec.js')
    ],


    // Log Level
    // ------------------------------
    // config.LOG_DISABLE
    // config.LOG_ERROR
    // config.LOG_WARN
    // config.LOG_INFO
    // config.LOG_DEBUG
    logLevel : config.LOG_INFO,


    // Continuous Integration Mode
    // ------------------------------
    singleRun : false,


    // Test on File Change
    // ------------------------------
    autoWatch : true,


    // Colours
    // ------------------------------
    colors : true

  };


  // Execute Chrome on Travis-CI
  // ------------------------------
  if(process.env.TRAVIS){
    configuration.browsers = ['Chrome_travis_ci'];
    // configuration.reporters = configuration.reporters.concat(['coverage', 'coveralls']);
    // configuration.coverageReporter = {
    //   type : 'lcovonly',
    //   dir : 'coverage/'
    // };
  }


  config.set(configuration);

};
