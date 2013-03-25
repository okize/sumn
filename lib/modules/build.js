var sites = require(process.cwd() + '/lib/modules/sites'),
    cfg = require(process.cwd() + '/lib/config.json'),
    msg = require(process.cwd() + '/lib/modules/messaging'),
    requirejs = require('requirejs'),
    fs = require('fs'),
    _ = require('underscore'),
    wrench = require('wrench');

// returns an array of all the compiled front-end files of the microsite
// destination can be 'ftp', 'cdn', or null, the latter of which just returns a file list
exports.getMediaFiles = function (sitename, destination) {

  // holds directoy paths
  var pathRoot, paths = [];

  // microsite directory
  var dir = sites.getSiteDir(sitename);

  // array of all the files in the build directory
  var files = wrench.readdirSyncRecursive('./src/build/' + dir);

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
      pathRoot = './media/' + dir + '/';
      break;

    case 'cdn':
      pathRoot = cfg.cdn.mediaPath + 'microsites/' + dir + '/';
      break;

  }

  // prepend each file with path
  files.forEach( function (n) {
    paths.push(pathRoot + n);
  });

  return paths;

};

// check if a local directory exists
exports.doesDirectoryExist = function (pathname) {

  return fs.existsSync(pathname);

};

// check if a local build directory exists
exports.doesBuildDirectoryExist = function (dirname) {

  // build path
  var buildPath = './src/build/' + dirname;

  return fs.existsSync(buildPath);

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