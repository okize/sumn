// sumn modules
var sites = require(process.cwd() + '/lib/modules/sites'),
    ftp = require(process.cwd() + '/lib/modules/ftp'),
    build = require(process.cwd() + '/lib/modules/build'),
    msg = require(process.cwd() + '/lib/modules/messaging'),
    cfg = require(process.cwd() + '/lib/config.json');

var util = require('util'),
    fs = require('fs'),
    // path = require('path'),
    _ = require('underscore'),
    openBrowser = require('open'),
    wrench = require('wrench');

// creates a new microsite instance and copies in boilerplate code
exports.createSite = function (sitename, dirname) {

  // if no sitename is entered prompt user for sitename
  if (typeof sitename === 'undefined') {
    return msg.con('error', 'needSitename');
  } else {

    // check if site exists
    if (sites.doesSiteExist(sitename)) {
      return msg.con('error', 'siteAlreadyExists');
    }

    // if no directory name argument is passed, default to
    // using a lowercase version of the sitename
    if (typeof dirname === 'undefined') {
      dirname = sitename.toLowerCase();
    }

    // check if directory already exists
    if (!build.doesDirectoryExist(dirname)) {
      return msg.con('error', 'dirAlreadyExists', dirname);
    }

    // add the new site to micrositeList
    sites.addNewSite(sitename, dirname);

    // copy boilerplate folder into new microsite directory
    wrench.copyDirSyncRecursive('./src/_boilerplate', './src/sites/' + dirname);

    // local url to view site
    var url = cfg.localDevelopmentServer + dirname + '/';

    // open new microsite in browser
    openBrowser(url, cfg.browser);

    // log success
    return msg.con('info', 'siteCreated', sitename);

  }

};

// @todo build site
// first it compiles the site code inside 'src' to a new folder called 'build'
exports.buildSite = function (sitename) {

  // @todo does the build directory exist? if not, create it
  //
  debug('foo');

  var requirejs = require('requirejs');

  var config = {
    baseUrl: './src/sites/_global/javascript',
    name: 'almond',
    include: './src/sites/' + sitename + '/javascript/main',
    out: './src/build/' + sitename + '/javascript/script.js',
    wrap: true,
    optimize: 'none'
  };

  requirejs.optimize(config, function (buildResponse) {
    console.log('config');

    //buildResponse is just a text output of the modules
    //included. Load the built file for the contents.
    //Use config.out to get the optimized file contents.
    var contents = fs.readFileSync(config.out, 'utf8');
    console.log(contents);
    // return msg.con('info', 'buildingSiteStart', sitename);
  }, function (err) {
    return msg.con('error', 'genericError', err);
  });





  // Deep-copy an existing directory
  // wrench.copyDirSyncRecursive('directorytocopy', 'locationwherecopyshouldendup');

};

// this function "releases" a microsite by FTPing the file assets
// from the build directory to the media server environment specified
exports.releaseSite = function (sitename, env) {

  // environments for media server
  var environments = ['eng', 'qa', 'prod'];

  // check value of sitename & env
  if (!sites.doesSiteExist(sitename)) {
    return msg.con('error', 'siteDoesNotExist', sitename);
  } else if (typeof env === 'undefined') {
    return msg.con('error', 'noEnvSpecified');
  } else if ( !_.contains(environments, env) ) {
    return msg.con('error', 'incorrectEnvSpecified');
  }

  // get directory name of site being released
  var dirname = sites.getSiteDir(sitename);

  // check that site has a built directory
  if (!build.doesBuildDirectoryExist(dirname)) {
    return msg.con('error', 'dirNotBuilt', dirname);
  }

  // paths of local files that will be uploaded to media server
  var filePaths = build.getMediaFiles(sitename, 'ftp');

  // upload files to media server
  ftp.pushToMedia(filePaths, dirname, env);

  // @todo log success? email? growl?
  // @todo increment 'releases' property in micrositeList.json

};

// this function produces a set of urls that will be purged on the CDN
// then spawns a child process and passes those URLs to a CasperJS/PhantomJS script
// that then automates the process of purging files with the CDN tool
exports.purgeCdn = function (sitename) {

  // check if site that's been requested for purge actually exists
  if (!sites.doesSiteExist(sitename)) {
    return msg.con('error', 'siteDoesNotExist', sitename);
  }

  // get array of urls to be purged on cdn
  var urls = build.getMediaFiles(sitename, 'cdn');

  // check if any urls are returned
  if (urls.length < 1) {
    return msg.con('error', 'cdnPurgeNoUrls', sitename);
  }

  // start CDN purge
  msg.con('info', 'cdnPurgeStart', urls);

  // pass urls to purge.js
  var spawn = require('child_process').spawn;
  var purge = spawn('casperjs', ['./lib/modules/purgeCdn.js', urls]);

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

// returns a list of microsites; status can be 'active', 'retired' or 'all'
exports.getListOfSites = function (args) {

  if (typeof args !== 'object') {
    return msg.con('error', 'argumentsMissing', 'getListOfSites()');
  }

  var list;

  // set list to status arg
  if (args.status === 'active') {
    list = sites.getMicrositeList('active');
  } else if (args.status === 'retired') {
    list = sites.getMicrositeList('retired');
  } else {
    list = sites.getMicrositeList();
  }

  // sort list alphabetically
  list.sort();

  var count = list.length;

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