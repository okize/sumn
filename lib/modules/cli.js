var app = require('../app'),
    program = require('commander'),
    meta = require('../../package.json');

program
  .version(meta.version)
  .option('-d, --docs', 'view sumn documentation in browser')
  .option('-l, --list', 'returns a list of all microsites')
  .option('-p, --published', 'returns a list of just the "published" microsites')
  .option('-r, --retired', 'returns a list of just the "retired" microsites');

program
  .command('create [sitename]')
  .description('> create a new microsite')
  .option('-d, --directory [dirname]', 'Name of the directory containing new site')
  .action(function(sitename, options) {
    app.createSite(sitename, options.directory);
  });

program
  .command('build [sitename]')
  .description('> build microsite assests (js, css & images) prior to release')
  .action(function(sitename) {
    app.buildSite(sitename);
  });

program
  .command('release [sitename]')
  .description('> release a microsite to a specified environment')
  .option('-m, --message [message]', 'Release notes')
  .option('-e, --environment [env]', 'Which environment to release to')
  .option('-a, --assets [assets]', 'Specify which assets to release (Ie. JS, CSS or IMAGES; default is all)')
  .action(function (sitename, options) {
    app.releaseSite(sitename, options.message, options.assets, options.environment);
  });

program
  .command('purge [sitename]')
  .description('> purge microsite assests (js, css & images) on CDN')
  .option('-a, --assets [assets]', 'Specify which assets to release (Ie. JS, CSS or IMAGES; default is all)')
  .action(function(sitename, options) {
    app.purgeCdn(sitename, options.assets);
  });

program
  .command('retire [sitename]')
  .description('> retire an existing microsite')
  .action(function(sitename) {
    app.retireSite(sitename);
  });

program.parse(process.argv);

if (!program.args.length) {

  if (program.docs) {

    var exec = require('child_process').exec, child;
    child = exec('node ./docs/docs');

  } else if (program.list) {

    app.getListOfSites({
      status: 'all'
    });

  } else if (program.published) {

    app.getListOfSites({
      status: 'published'
    });

  } else if (program.retired) {

    app.getListOfSites({
      status: 'retired'
    });

  } else {

    // show help by default
    program.parse([process.argv[0], process.argv[1], '-h']);
    process.exit(0);

  }

}