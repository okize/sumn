// node core modules
var util = require('util'),
    fs = require('fs'),
    path = require('path');

// sumn modules
var sites = require(process.cwd() + '/lib/modules/sites'),
    files = require(process.cwd() + '/lib/modules/files'),
    msg = require(process.cwd() + '/lib/modules/messaging');

// configuration files
var cfg = require(process.cwd() + '/lib/config.json');

var _ = require('underscore'),
    openBrowser = require('open'),
    wrench = require('wrench');


var Ftp = require('jsftp');

// configuration for ftp connection
var ftpCfg = {
  host: cfg.ftp.host,
  port: cfg.ftp.port,
  user: cfg.ftp.username,
  pass: cfg.ftp.password
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

// @todo build site
exports.buildSite = function (sitename) {

  return msg.con('info', 'buildingSiteStart', sitename);

  // @todo does the build directory exist? if not, create it

};

// creates a new microsite instance and copies in boilerplate code
exports.createSite = function (sitename, dirname) {

  // if no sitename is entered prompt user for sitename
  if (typeof sitename === 'undefined') {

    return msg.con('error', 'needSitename');

  } else {

    // if no directory name argument is passed, default to
    // using a lowercase version of the sitename
    if (typeof dirname === 'undefined') {
      dirname = sitename.toLowerCase();
    }

    // @todo: check if directory already exists

    var url = cfg.localDevelopmentServer + dirname + '/';

    if (sites.doesSiteExist(sitename)) {
      return msg.con('error', 'siteAlreadyExists');
    }

    // add the new site to micrositeList
    sites.addNewSite(sitename, dirname);

    // copy boilerplate folder into new microsite directory
    wrench.copyDirSyncRecursive('./src/_boilerplate', './src/sites/' + dirname);

    // launch new microsite in default browser
    openBrowser(url);

    // log success
    return msg.con('info', 'siteCreated', sitename);

  }

};

// this function "releases" a microsite by doing two things
// first it compiles the site code inside 'src' to a new folder called 'build'
// then it FTPs the code from media to the media server environment specified
exports.releaseSite = function (sitename, env) {

  // @todo move this to another function
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

  // @todo check that the folder is in place
  // http://nodejs.org/api/fs.html#fs_fs_exists_path_callback

  // @todo should have an option for sitename==="all" to release every site at once
  var msDir = sites.getSiteDir(sitename);

  // Deep-copy an existing directory
  // wrench.copyDirSyncRecursive('directorytocopy', 'locationwherecopyshouldendup');

  // paths of local files that will be uploaded to media server
  var filePaths = files.getMediaFiles(sitename, 'ftp');

  //

  // open ftp connection with ftp config object
  var ftp = new Ftp(ftpCfg);

  ftp.ls('/' + env + '/microsites', function(err, files){

    if (err) {
      return msg.log('error', err);
    }

    for (var i = 0, len = files.length; i < len; i++) {
      if (typeof files[i] !== 'undefined') {
        msg.con('info', 'genericMessage', files[i].name);
      }
    }

  });

  // close ftp connection
  ftp.raw.quit(function(err, res) {

    if (err) {
      return msg.log('error', err);
    }

    msg.con('info', 'ftpFinished');

  });

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
  var urls = files.getMediaFiles(sitename, 'cdn');

  // @todo: check if directory exists

  // check if any urls are returned
  if (urls.length < 1) {
    return msg.con('error', 'cdnPurgeNoUrls', sitename);
  }

  // pass urls to purge.js
  var spawn = require('child_process').spawn;
  var purge = spawn('casperjs', ['./lib/modules/purgeCdn.js', urls]);

  msg.con('info', 'cdnPurge', urls);

  purge.stdout.on('data', function (data) {
    return msg.log('list', data);
  });

  purge.stderr.on('data', function (data) {
    return msg.log('error', data);
  });

};

// returns a list of microsites
// args.status can be 'active', 'retired' or 'all'
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