// modules
var cfg = require(process.cwd() + '/lib/config/user.json'),
    msg = require(process.cwd() + '/lib/modules/messaging'),
    jsftp = require('jsftp'),

    // configuration for ftp connection
    ftpConfig = {
      host: cfg.ftp.host,
      port: cfg.ftp.port
    },

   // login info for ftp connection
    ftpLogin = {
      user: cfg.ftp.username,
      pass: new Buffer(cfg.ftp.password, 'base64').toString('ascii')
    };

// open ftp connection
var openFtpConn = function (callback) {

  return true;

};

// close ftp connection
var closeFtpConn = function (conn) {

  return true;

};

// checks if directory exists
var doesFtpDirExist = function (conn, dirname) {

  return true;

};

// list directories on media server in microsites directory
var getFtpDirs = function (conn, env) {

  return true;

};

// create a directory on media server
var createFtpDir = function (conn, dirname, env) {

  return true;

};

// upload files to media server
exports.pushToServer = function (files, dirname, env) {

  console.log(files);
  console.log(dirname);
  console.log(env);
  return true;

};