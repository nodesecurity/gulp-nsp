'use strict';

var GulpUtil = require('gulp-util');
var Chalk = require('chalk');
var Table = require('cli-table');
var RequireSafe = require('../cli');
var format = RequireSafe.formatters.default;

var rsGulp = function (params, callback) {

  var payload = {};

  if (params.package) {
    payload.package = params.package;
  }

  if (params.shrinkwrap) {
    payload.shrinkwrap = params.shrinkwrap;
  }

  RequireSafe.check(payload, function (err, data) {

    var stack = format(err, data);

    if (err || data.length) {
      if (params.stopOnError === false) {
        GulpUtil.log(stack);
        return callback();
      }; 
    }

    return callback({
      stack: stack,
      message: stack.split('\n')[0]
    });

  });

};

module.exports = rsGulp;
