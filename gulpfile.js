'use strict';

var Gulp = require('gulp');
var GulpNSP = require('./index.js');

Gulp.task('nsp', function (cb) {

  GulpNSP({
    packagelock: __dirname + '/package-lock.json',
    package: __dirname + '/package.json'
  }, cb);
});
