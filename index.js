'use strict';

var Nsp = require('nsp');
var PluginError = require('plugin-error');
var Log = require('fancy-log');
var PLUGIN_NAME = require('./package.json').name;

var rsGulp = function (params, callback) {

  var payload = {};
  var formatter = Nsp.formatters.default;

  if (params.package) {
    payload.package = params.package;
  }

  if (params.shrinkwrap) {
    payload.shrinkwrap = params.shrinkwrap;
  }

  // Enable builds behind the HTTP_PROXY
  if (params.proxy) {
    payload.proxy = params.proxy;
  }

  if (params.output) {
    if (Nsp.formatters.hasOwnProperty(params.output)) {
      formatter = Nsp.formatters[params.output];
    }
    else {
      Log('Invalid formatter specified in options. Must be one of ' + Object.keys(Nsp.formatters).join(', ') + '\nUsing default formatter');
    }
  }

  Nsp.check(payload, function (err, data) {

    var output = formatter(err, data);
    var pluginErr = new PluginError(PLUGIN_NAME, output);

    if (err) {
      if (params.stopOnError === false) {
        Log(output);
        return callback();
      }
      return callback(pluginErr);
    }

    if (params.stopOnError === false || data && data.length === 0) {
      Log(output);
      return callback();
    }

    if (data.length > 0) {
      return callback(pluginErr);
    }

  });

};

module.exports = rsGulp;
