var cfg = require(process.cwd() + '/lib/config.json');

// load the language file according to setting in user configuartion
var messages = require(process.cwd() + '/lib/lang/messages.' + cfg.language + '.json');

// https://github.com/medikoo/cli-color
var colors = require('cli-color');

// configuration for command line colorization
var clc = {
  error: colors.white.bold.bgRed,
  warn: colors.yellow,
  info: colors.blue,
  ask: colors.yellow,
  list: colors.white
};

// returns a string of the requested message
exports.str = function(type, key, data) {

  return messages[type][key];

};

// logs requested message to the console
exports.con = function(type, key, data) {

  if (typeof data === 'undefined') {
    data = '';
  }

  return console.log( clc[type]( messages[type][key] ), data);

};

// logs message to the console
// to be used when not in control of message language
exports.log = function(type, msg, data) {

  if (typeof data === 'undefined') {
    data = '';
  }

  if (type === 'error') {
    return console.error( clc[type](msg), data);
  } else {
    return console.log( clc[type](msg), data);
  }

};