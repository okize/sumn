var messages = {
  'cdnPurge': 'purging following files on CDN:\n %j',
  'siteCreated': '%j has been created',
  'siteRetired': '%j has been retired',
  'error': {
    'notSiteProperty': '%j is not a valid property',
    'needSitename': 'please enter a name for the new microsite: ',
    'siteAlreadyExists': 'a microsite by that name already exists, please try again with a different name: ',
    'siteDoesNotExist': 'there is no record of a microsite named %j',
    'siteAlreadyRetired': '%j has already been retired',
    'noEnvSpecified': 'which environment do you want to release to? please use the -e flag to specify an environment',
    'incorrectEnvSpecified': 'environment must be eng, qa or prod',
    'cdnPurgeNoUrls': 'there are no files built for %j'
  }
};

var colors = require('cli-color'); // https://github.com/medikoo/cli-color


// node core modules
var util = require('util'),
    fs = require('fs'),
    path = require('path');


// returns a string of the requested message
exports.str = function(foo) {

  return 'asdf';

};

// logs requested message to the console
exports.con = function(foo) {

  return 'asdf';

};