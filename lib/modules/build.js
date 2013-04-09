// modules
var cfg = require(process.cwd() + '/lib/config/user.json'),
    msg = require(process.cwd() + '/lib/modules/messaging'),
    sites = require(process.cwd() + '/lib/modules/sites'),
    requirejs = require('requirejs'),
    fs = require('fs'),
    path = require('path'),
    _ = require('underscore'),
    wrench = require('wrench');

// returns an array of all the compiled front-end files of the microsite
// destination can be 'ftp', 'cdn', or null, the latter of which just returns a file list
exports.getAssetPaths = function (sitename, destination, assets) {

  // vars to hold various files & directory paths
  var files, assetDirs, filePaths, destinationMap;

  // regex to filter out any file that doesn't end with 'css, js, png, gif, jpg, jpeg'
  var regexp = /(.*.(jpe?g|gif|png|css|js))/gi;

  // microsite directory
  var siteDir = sites.getSiteDir(sitename);

   // array of all the files in the build directory
  assetDirs = _.map(assets, function (dir) {
    return path.join(__dirname, '../../src/build/', siteDir, dir);
  });

  files = _.map(assetDirs, function (dir) {
    return wrench.readdirSyncRecursive(dir);
  });

  // @todo; getting an array or arrays so I need to flatten
  // there's probably a way to avoid this
  files = _.flatten(files);

  files = _.filter(files, function (file) {
    return file.match(regexp);
  });

  // just return the files if no destination indicated
  if (typeof destination === 'undefined' || !destination) {
    return files;
  }

  // set the correct file path
  destinationMap = {
    local: path.join('/src/build/', siteDir, '/'),
    ftp: cfg.ftp.mediaPath + path.join('microsites/', siteDir, '/'),
    cdn: cfg.cdn.mediaPath + path.join('microsites/', siteDir, '/')
  };

  // prepend each file with path
  filePaths = _.map(files, function (file) {
    return destinationMap[destination] + file;
  });

  return filePaths;

};

// check if a local directory exists
exports.doesDirectoryExist = function (pathname) {
  return fs.existsSync(pathname);
};

// check if a local build directory exists
exports.doesBuildDirectoryExist = function (dirname) {

  var buildDir = './src/build/' + dirname;

  return fs.existsSync(buildDir);

};

// compile func
exports.compileAssets = function (sitename) {

  console.log(sitename);

  var requirejs = require('requirejs');

  var config = {
    name: './src/sites/_global/javascript/almond',
    include: './src/sites/' + sitename + '/javascript/main',
    out: './src/build/' + sitename + '/javascript/script.js',
    wrap: true,
    optimize: 'none'
  };

  requirejs.optimize(config, function (buildResponse) {
    // console.log(config);
    // console.log(buildResponse);
    //buildResponse is just a text output of the modules
    //included. Load the built file for the contents.
    //Use config.out to get the optimized file contents.
    var contents = fs.readFileSync(config.out, 'utf8');
    console.log(contents);
    // return msg.con('info', 'buildingSiteStart', sitename);
  }, function (err) {
    return msg.con('error', 'genericError', err);
  });

};