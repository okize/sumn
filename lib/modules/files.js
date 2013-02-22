var sites = require(process.cwd() + '/lib/modules/sites'),
    cfg = require(process.cwd() + '/lib/config.json'),
    msg = require(process.cwd() + '/lib/modules/messaging'),
    _ = require('underscore'),
    wrench = require('wrench'),
    ftp = require('jsftp'),
    ftpCfg = { // configuration for ftp connection
      host: cfg.ftp.host,
      port: cfg.ftp.port,
      user: cfg.ftp.username,
      pass: cfg.ftp.password
    };

// close ftp connection
var closeFtpConn = function (conn) {

  conn.raw.quit(function(err, res) {

    if (err) {
      return msg.log('error', err);
    }

    return msg.con('info', 'ftpFinished');

  });

};

// upload files to media server
exports.pushToMedia = function (files, env) {

  // open ftp connection with ftp config object
  var conn = new ftp(ftpCfg);

  closeFtpConn(conn);

};

// list directories on media server in microsites directory
exports.listMediaDirs = function (env) {

  // open ftp connection with ftp config object
  var conn = new ftp(ftpCfg);

  conn.ls('/' + env + '/microsites', function(err, files){

    if (err) {
      return msg.log('error', err);
    }

    for (var i = 0, len = files.length; i < len; i++) {
      if (typeof files[i] !== 'undefined') {
        msg.con('info', 'genericMessage', files[i].name);
      }
    }

  });

  closeFtpConn(conn);

};

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
  files.forEach(function (n) {
    paths.push(pathRoot + n);
  });

  return paths;

};

// @todo check if a directory exists
exports.doesDirectoryExist = function (dirname) {

  return true;
};

// @todo check if a build directory exists
exports.doesBuildDirectoryExist = function (dirname) {

  // check that the folder is in place
  // http://nodejs.org/api/fs.html#fs_fs_exists_path_callback

  return true;
};