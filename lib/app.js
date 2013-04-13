// modules
var cfg = require(process.cwd() + '/lib/config/user.json'),
    msg = require(process.cwd() + '/lib/modules/messaging'),
    sites = require(process.cwd() + '/lib/modules/sites'),
    build = require(process.cwd() + '/lib/modules/build'),
    release = require(process.cwd() + '/lib/modules/release'),
    notify = require(process.cwd() + '/lib/modules/notify'),
    util = require('util'),
    fs = require('fs'),
    _ = require('underscore'),
    openBrowser = require('open'),
    wrench = require('wrench');

var debug = require('debug')('app');
// siteList = _.sortBy(sites.getMicrositeUrls('prod'), function(site) {
//       return site.name;
//     }),

// creates a new microsite instance and copies in boilerplate code
exports.createSite = function (sitename, dirname) {

  var url;

  // err if no sitename is entered
  if (typeof sitename === 'undefined') {
    return msg.con('error', 'needSitename');
  }

  // err if site already exists
  if (sites.doesSiteExist(sitename)) {
    return msg.con('error', 'siteAlreadyExists');
  }

  // if no directory name argument is passed, default to
  // using a lowercase version of the sitename
  if (typeof dirname === 'undefined') {
    dirname = sitename.toLowerCase();
  }

  // err if directory already exists
  if (build.doesDirectoryExist(dirname)) {
    return msg.con('error', 'dirAlreadyExists', dirname);
  }

  // add the new site to micrositeList
  sites.addNewSite(sitename, dirname);

  // copy boilerplate folder into new microsite directory
  wrench.copyDirSyncRecursive('./src/sites/_boilerplate', './src/sites/' + dirname);

  // local url to view site
  url = cfg.localDevelopmentServer + dirname + '/';

  // open new microsite in browser
  openBrowser(url, cfg.browser);

  // send email on site creation if enabled
  if (cfg.notifications.create.sendEmails) {
    notify.send('create', {
      site: sitename,
      user: cfg.fullname
    });
  }

  // log success
  return msg.con('info', 'siteCreated', sitename);

};

// first it compiles the site code inside 'src' to a new folder called 'build'
exports.buildSite = function (sitename) {

  // 1. check if build directory exists, if not create it
  // 2. compile javascript modules to javascript directory
  // 3. compile sass to style.css in css directory
  // 4. compile jade templates
  //    -- need to variable flag to switch require.js in jade template to script.js
  // 5. need to pass js through uglify

  // does the build directory exist? if not, create it
  if (!build.doesBuildDirectoryExist(sitename)) {

    // @todo create build directory
    console.log('create build directory');

  }

  // compile js w/ require.js
  build.compileAssets(sitename);


  // Deep-copy an existing directory
  // wrench.copyDirSyncRecursive('dirToCopy', 'destinationDir');

};

// this function "releases" a microsite by FTPing the file assets
// from the build directory to the media server environment specified
exports.releaseSite = function (sitename, message, assets, env) {

  // @todo, ftp release files need to take into account the environment in their paths
  // 1. check that all required vars have been passed by command line
  // 2. check that the build directory has been created
  // 3. check which assets need to be released
  // 4. ftp to server


  var environments, dirname, filepaths;

  // environments for media server
  environments = ['eng', 'qa', 'prod'];

  // user error checking
  if (!sites.doesSiteExist(sitename)) {
    return msg.con('error', 'siteDoesNotExist', sitename);
  } else if (typeof message === 'undefined') {
    return msg.con('error', 'noReleaseNotes');
  } else if (typeof env === 'undefined') {
    return msg.con('error', 'noEnvSpecified');
  }

  // if the env specified is not in environments array return error
  if ( !_.contains(environments, env) ) {
    return msg.con('error', 'invalidEnvSpecified');
  }

  // get an array of requested assets
  assets = build.assetsToArray(assets);

  // get directory name of site being released
  dirname = sites.getSiteDir(sitename);

  // paths of local files that will be uploaded to media server
  filePaths = build.getAssetPaths(sitename, 'ftp', assets, env);

  // check that site has a built directory
  if (!build.doesBuildDirectoryExist(dirname)) {
    return msg.con('error', 'dirNotBuilt', buildPath + dirname);
  }

  // upload files to media server
  release.pushToServer(filePaths, dirname, env);

  // @todo increment 'releases' property in micrositeList.json
  // @todo store release notes somewhere?

  // send email on release if enabled
  if (cfg.notifications.release.sendEmails) {
    notify.send('release', {
      site: sitename,
      msg: message,
      date: '04/09/2013',
      files: filePaths
    });
  }

};

// this function produces a set of urls that will be purged on the CDN
// then spawns a child process and passes those URLs to a CasperJS/PhantomJS script
// that then automates the process of purging files with the CDN tool
exports.purgeCdn = function (sitename, assets) {

  var urls, spawn, purge;

  // check if site that's been requested for purge actually exists
  if (!sites.doesSiteExist(sitename)) {
    return msg.con('error', 'siteDoesNotExist', sitename);
  }

  // get an array of requested assets
  assets = build.assetsToArray(assets);

  // get array of urls to be purged on cdn
  urls = build.getAssetPaths(sitename, 'cdn', assets);

  // check if any urls are returned
  if (urls.length < 1) {
    return msg.con('error', 'cdnPurgeNoUrls', sitename);
  }

  // start CDN purge
  msg.con('info', 'cdnPurgeStart');

  // list the urls that are being purged
  msg.log('list', '\t', urls.join('\n\t'));

  // pass urls to purge.js
  spawn = require('child_process').spawn;
  purge = spawn('casperjs', ['./lib/modules/purgeCdn.js', urls]);

  // log purge.js results to console
  purge.stdout.on('data', function (data) {
    return msg.log('list', data);
  });

  purge.stdout.on('close', function (data) {
    msg.con('info', 'cdnPurgeEnd');
  });

  purge.stderr.on('data', function (data) {
    return msg.log('error', data);
  });

};

// returns a list of microsites; status can be 'published', 'retired' or 'all'
exports.getListOfSites = function (args) {

  var list, count;

  if (typeof args !== 'object') {
    return msg.con('error', 'argumentsMissing', 'getListOfSites()');
  }

  // set list to status arg
  if (args.status === 'published') {
    list = sites.getMicrositeList('published');
  } else if (args.status === 'retired') {
    list = sites.getMicrositeList('retired');
  } else {
    list = sites.getMicrositeList();
  }

  // sort list alphabetically
  list.sort();

  count = list.length;

  if (count > 0) {

    if (args.status === 'active') {
      msg.con('info', 'countActiveSites', count);
    } else if (args.status === 'retired') {
      msg.con('info', 'countRetiredSites', count);
    } else {
      msg.con('info', 'countTotalSites', count);
    }

    return msg.log('list', list.join('\n'));

  } else {
    return msg.con('error', 'noTypeSites', args.status);
  }

};

// "retire" a site by switching it's "isActive" property in micrositeList.json
exports.retireSite = function (sitename) {

  if (!sites.doesSiteExist(sitename)) {
    return msg.con('error', 'siteDoesNotExist', sitename);
  } else if (!sites.isSiteActive(sitename)) {
    return msg.con('error', 'siteAlreadyRetired', sitename);
  } else {
    return sites.updateSiteProperty(sitename, 'isActive', false, sitename + msg.str('info', 'siteRetired'));
  }

};