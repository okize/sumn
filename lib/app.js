// node core modules
var util = require('util'),
    fs = require('fs'),
    path = require('path');

// sumn modules
var sites = require(process.cwd() + '/lib/modules/sites.js'),
    _msg = require(process.cwd() + '/lib/modules/messaging.js');

// configuration files
var cfg = require(process.cwd() + '/lib/config.json');
var msg = require(process.cwd() + '/lib/messages.json');

// 3rd party modules
var _ = require('underscore'); // https://github.com/documentcloud/underscore/
var prompt = require('prompt'); // https://github.com/flatiron/prompt
var Ftp = require('jsftp'); // https://github.com/sergi/jsftp
var openBrowser = require('open'); // https://github.com/jjrdn/node-open
var wrench = require('wrench'); // https://github.com/ryanmcgrath/wrench-js
var colors = require('cli-color'); // https://github.com/medikoo/cli-color
// var growl = require('growl'); // https://github.com/visionmedia/node-growl

// configuration for ftp connection
var ftpCfg = {
  host: cfg.ftp.host,
  port: cfg.ftp.port,
  user: cfg.ftp.username,
  pass: cfg.ftp.password
};

// configuration for command line colorization
var clc = {
  error: colors.red.bold,
  warn: colors.yellow,
  info: colors.blue,
  ask: colors.yellow
};

// @todo: abstract console logs into messaging function




// returns an array of all the compiled front-end files of the microsite
// destination can be 'ftp', 'cdn', or null, the latter of which just returns a file list
var getMediaFiles = function (sitename, destination) {

  // holds directoy paths
  var pathRoot, paths = [];

  // microsite directory
  var msDir = sites.getSiteDir(sitename);

  // array of all the files in the build directory
  var files = wrench.readdirSyncRecursive('./build/' + msDir);

  // filter out of files array anything that doesn't end with 'css, js, png, gif, jpg, jpeg'
  var regexp = /(.*.(jpe?g|gif|png|css|js))/gi;
  files = _.filter(files, function (file) {
    return file.match(regexp);
  });

  // just return the files if no destination indicated
  if (typeof destination === 'undefined' || !destination) {
    return files;
  }

  // set the correct file path
  switch (destination) {

    case 'ftp':
      pathRoot = './media/' + msDir + '/';
      break;

    case 'cdn':
      pathRoot = cfg.cdn.mediaPath + 'microsites/' + msDir + '/';
      break;

  }

  // prepend each file with path
  files.forEach(function (n) {
    paths.push(pathRoot + n);
  });

  return paths;

};

// "retire" a site by switching it's "isActive" property in micrositeList.json
exports.retireSite = function (sitename) {

  if (!sites.doesSiteExist(sitename)) {

    return console.error(clc.error(msg.error.siteDoesNotExist), sitename);

  } else if (!sites.isSiteActive(sitename)) {

    return console.log(clc.warn(msg.error.siteAlreadyRetired), sitename);

  } else {

    return sites.updateSiteProperty(sitename, 'isActive', false);

  }

};

// @todo build site
exports.buildSite = function (sitename) {

  return console.error(clc.info('Building site!'));

};

// creates a new microsite instance and copies in boilerplate code
exports.createSite = function (sitename, dirname) {

  // @todo: i feel that this doesn't belong in app.js
  // since we're asking for input form the temrinal
  // but it also doesn't belong in sumn.js (i don't think)
  // if no sitename is entered prompt user for sitename
  if (typeof sitename === 'undefined') {

    prompt.message = '';
    prompt.delimiter = '';
    prompt.start();
    prompt.get({
      properties: {
        sitename: {
          description: msg.error.needSitename
        }
      }
    }, function (err, result) {
      exports.createSite(result.sitename);
    });

  } else {

    if (typeof dirname === 'undefined') {
      dirname = sitename.toLowerCase();
    }

    // @todo: check if directory already exists

    var url = cfg.localDevelopmentServer + dirname + '/';

    if (sites.doesSiteExist(sitename)) {
      console.error(clc.error(msg.error.siteAlreadyExists));
      return;
    }

    // add the new site to micrositeList
    sites.addNewSite(sitename, dirname);

    // copy boilerplate folder into new microsite directory
    wrench.copyDirSyncRecursive('./src/_boilerplate', './src/sites/' + dirname);

    // launch new microsite in default browser
    openBrowser(url);

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

    return console.error(clc.error(msg.error.siteDoesNotExist), sitename);

  } else if (typeof env === 'undefined') {

    return console.error(clc.error(msg.error.noEnvSpecified));

  } else if ( !_.contains(environments, env) ) {

    return console.error(clc.error(msg.error.incorrectEnvSpecified));

  }

  // @todo check that the folder is in place
  // http://nodejs.org/api/fs.html#fs_fs_exists_path_callback

  // @todo should have an option for sitename==="all" to release every site at once
  var msDir = sites.getSiteDir(sitename);

  // Deep-copy an existing directory
  // wrench.copyDirSyncRecursive('directorytocopy', 'locationwherecopyshouldendup');

  // paths of local files that will be uploaded to media server
  var filePaths = getMediaFiles(sitename, 'ftp');

  // open ftp connection with ftp config object
  var ftp = new Ftp(ftpCfg);

  ftp.ls('/' + env + '/microsites', function(err, files){
    if (err) {
      return console.error(clc.error(err));
    }
    for (var i = 0, len = files.length; i < len; i++) {
      if (typeof files[i] !== 'undefined') {
        console.log(clc.info(files[i].name));
      }
    }
  });

  // close ftp connection
  ftp.raw.quit(function(err, res) {
    if (err) {
      return console.error(clc.error(err));
    }
    console.log(clc.info('FTP session finished'));
  });

  // @todo increment 'releases' property in micrositeList.json

};


// this function produces a set of urls that will be purged on the CDN
// then spawns a child process and passes those URLs to a CasperJS/PhantomJS script
// that then automates the process of purging files with the CDN tool
exports.purgeCdn = function (sitename) {

  // @todo: check if site that's been requested for purge actually exists

  // get array of urls to be purged on cdn
  var urls = getMediaFiles(sitename, 'cdn');

  // check if any urls are returned
  if (urls.length < 1) {
    console.log(clc.error(msg.error.cdnPurgeNoUrls), sitename);
    return;
  }

  // pass urls to purge.js
  var spawn = require('child_process').spawn;
  var purge = spawn('casperjs', ['./lib/modules/purgeCdn.js', urls]);

  console.log(clc.info(msg.cdnPurge), urls);

  purge.stdout.on('data', function (data) {
    console.log('' + data);
  });

  purge.stderr.on('data', function (data) {
    console.log('error: ' + data);
  });

};

// returns a list of microsites
// args.listType can be 'active', 'retired' or 'all'
// args.toConsole is boolean; if false returns an array
// @todo, move this into sites.js
exports.getListOfSites = function (args) {

  if (typeof args !== 'object') {
    console.log('arguments for %j missing', 'getListOfSites()');
    return false;
  }

  var microsites = sites.getMicrositeListObject().sites,
      list = _.keys(microsites),
      active = [],
      retired = [];

  // iterrate through the microsite list and filter according to args.listType
  for (var i = 0, len = list.length; i < len; i++) {
    if (microsites[ list[i] ].isActive) {
      active.push( list[i] );
    } else {
      retired.push( list[i] );
    }
  }

  // set list to listType arg
  if (args.listType === 'active') {
    list = active;
  } else if (args.listType === 'retired') {
    list = retired;
  }

  // if args.toConsole is true then display the sitenames in the console
  // otherwise return an array of sitenames
  if (args.toConsole) {

    // sort list alphabetically
    list.sort();

    var count = list.length;

    if (count > 0) {

      if (args.listType === 'active') {
        console.log(clc.info('%j active sites:'), count);
      } else if (args.listType === 'retired') {
        console.log(clc.info('%j retired sites:'), count);
      } else {
        console.log(clc.info('%j sites:'), count);
      }

      return console.log(list.join('\n'));

    } else {

      return console.log(clc.info('No %j sites'), args.listType);

    }

  } else {

    return list;

  }

};