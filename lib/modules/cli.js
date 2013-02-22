var app = require('../app'),
    _program = require('commander'), // https://github.com/visionmedia/commander.js
    meta = require('../../package.json');

_program
  .version(meta.version)
  .option('-l, --list', 'returns a list of all microsites')
  .option('-a, --active', 'returns a list of just the "active" microsites')
  .option('-r, --retired', 'returns a list of just the "retired" microsites');

_program
  .command('create [sitename]')
  .description('> create a new microsite')
  .option('-d, --directory [dirname]', 'Name of the directory containing new site')
  .action(function(sitename, options) {
    app.createSite(sitename, options.directory);
  });

_program
  .command('build [sitename]')
  .description('> build microsite assests (js, css & images) prior to release')
  .action(function(sitename) {
    app.buildSite(sitename);
  });

_program
  .command('release [sitename]')
  .description('> release a microsite to a specified environment')
  .option('-e, --environment [env]', 'Which environment to release to')
  .action(function (sitename, options) {
    app.releaseSite(sitename, options.environment);
  });

_program
  .command('purge [sitename]')
  .description('> purge microsite assests (js, css & images) on CDN')
  .action(function(sitename) {
    app.purgeCdn(sitename);
  });

_program
  .command('retire [sitename]')
  .description('> retire an existing microsite')
  .action(function(sitename) {
    app.retireSite(sitename);
  });

_program.parse(process.argv);

if (!_program.args.length) {

  if (_program.list) {

    app.getListOfSites({
      status: 'all'
    });

  } else if (_program.active) {

    app.getListOfSites({
      status: 'active'
    });

  } else if (_program.retired) {

    app.getListOfSites({
      status: 'retired'
    });

  } else {

    // show help by default
    _program.parse([process.argv[0], process.argv[1], '-h']);
    process.exit(0);

  }

}