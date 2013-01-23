#!/usr/bin/env node

/*
 * This file is a command line interface for ./lib/app.js
 */

var sumn = require('./lib/app');
var _program = require('commander'); // https://github.com/visionmedia/commander.js

_program
  .version('0.0.3')
  .option('-l, --list', 'generate a list of all "published" microsites');

_program
  .command('create [sitename]')
  .description('> create a new microsite')
  .action(function(sitename) {
    sumn.createSite(sitename);
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
  .description('> purge microsite js/css/image files on CDN')
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

// else {
//   // warn aboud invalid commands
//   var validCommands = _program.commands.map(function(cmd){
//     return cmd.name;
//   });
//   var invalidCommands = _program.args.filter(function(cmd){
//     // if command executed it will be an object and not a string
//     return (typeof cmd === 'string' && validCommands.indexOf(cmd) === -1);
//   });
//   if (invalidCommands.length) {
//     console.log('\n [ERROR] - Invalid command: "%s". See "--help" for a list of available commands.\n', invalidCommands.join(', '));
//   }
// }