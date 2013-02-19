#!/usr/bin/env node

/*
 * This file is a command line interface for ./lib/app.js
 */

var sumn = require('./lib/app');
var _program = require('commander'); // https://github.com/visionmedia/commander.js

_program
  .version('0.0.4')
  .option('-l, --list', 'generate a list of all "published" microsites');

_program
  .command('create [sitename]')
  .description('> create a new microsite')
  .action(function(sitename) {
    sumn.createSite(sitename);
  });

_program
  .command('build [sitename]')
  .description('> build microsite assests (js, css & images) prior to release')
  .action(function(sitename) {
    sumn.buildSite(sitename);
  });

_program
  .command('release [sitename]')
  .description('> release a microsite to a specified environment')
  .option('-e, --environment [env]', 'Which environment to release to')
  .action(function (sitename, options) {
    sumn.releaseSite(sitename, options.environment);
  });

_program
  .command('purge [sitename]')
  .description('> purge microsite assests (js, css & images) on CDN')
  .action(function(sitename) {
    sumn.purgeCdn(sitename);
  });

_program
  .command('retire [sitename]')
  .description('> retire an existing microsite')
  .action(function(sitename) {
    sumn.retireSite(sitename);
  });

_program.parse(process.argv);

// @todo fix this mess
if (!_program.args.length) {

  if (_program.list) {

    // display list of active microsites
    sumn.getListOfSites({
      listType: 'active',
      toConsole: true
    });

  } else {

    // show help by default
    _program.parse([process.argv[0], process.argv[1], '-h']);
    process.exit(0);

  }

}