'use strict';

var Nsp = require('nsp');
var Preprocessor = require('nsp/lib/preprocessor');
var Reporter = require('nsp/reporters');
var PluginError = require('plugin-error');
var Log = require('fancy-log');
var PLUGIN_NAME = require('./package.json').name;
var Os = require('os');
var Fs = require('fs');
var Path = require('path');

var internals = {};
internals.wrapReporter = function (name, fn, ...args) {

  var output = '';
  return new Promise((resolve, reject) => {

    try {
      return resolve(fn(...args, {
        log: function (...segments) {

          output += segments.join(' ') + '\n';
        },
        error: function (...segments) {

          output += segments.join(' ') + '\n';
        }
      }));
    }
    catch (err) {
      return reject(err);
    }
  }).catch((err) => {

    output += `Error in reporter: ${name}\n`;
    output += err.stack + '\n';
  }).then(() => {

    return output;
  });
};

var rsGulp = function (params, callback) {

  var payload = Nsp.sanitizeParameters(params);
  var reporter = Reporter.load(payload.reporter);

  return Promise.resolve().then(() => {

    const preprocessor = Preprocessor.load(payload.preprocessor);
    return preprocessor.hasOwnProperty('check') ? preprocessor.check(payload) : Promise.resolve(payload);
  }).then((args) => {

    return Nsp.check(args);
  }).then((result) => {

    var maxCvss;
    if (payload.filter ||
        payload.threshold) {

      maxCvss = Math.max(...result.data.map((item) => item.cvss_score));
    }

    if (payload.filter &&
        result.data.length) {
 
      result.data = result.data.filter((item) => item.cvss_score > args.filter);
    }

    var buildReport;
    if (reporter.hasOwnProperty('check') &&
        reporter.check.hasOwnProperty('success')) {

      buildReport = internals.wrapReporter(payload.reporter, reporter.check.success, result, payload);
    }
    else {
      buildReport = internals.wrapReporter(payload.reporter, reporter.success, result, payload);
    }

    return buildReport.then((output) => {
      if (params.stopOnError === false || result.data && result.data.length === 0) {
        Log(output.trim());
        return callback();
      }

      if (result.data.length > 0) {
        var pluginErr = new PluginError(PLUGIN_NAME, output);
        return callback(pluginErr);
      }
    })
  }).catch((err) => {

    var buildReport;
    if (reporter.hasOwnProperty('check') &&
        reporter.check.hasOwnProperty('error')) {

      buildReport = internals.wrapReporter(payload.reporter, reporter.check.error, err, payload);
    }
    else {
      buildReport = internals.wrapReporter(payload.reporter, reporter.error, err, payload);
    }

    return buildReport.then((output) => {
      var pluginErr = new PluginError(PLUGIN_NAME, output);
      return callback(pluginErr);
    })
  });
};

module.exports = rsGulp;
