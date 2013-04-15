// modules
var cfg = require(process.cwd() + '/lib/config/user.json'),
    msg = require(process.cwd() + '/lib/modules/messaging'),
    _ = require('underscore'),
    jsftp = require('jsftp'),

    // file object types
    typeMap = ['file','folder'];

    // map environment value to correct remote path
    remoteServerPathMap = {
      eng: '/eng/microsites/',
      qa: '/qa/microsites/',
      prod: '/prod/microsites/'
    },

    // configuration for ftp connection
    // ftpConfig = {
    //   host: cfg.ftp.host,
    //   port: cfg.ftp.port
    // },

    // // login info for ftp connection
    // ftpAuth = {
    //   user: cfg.ftp.username,
    //   pass: new Buffer(cfg.ftp.password, 'base64').toString('ascii')
    // };

    // configuration for ftp connection
    ftpConfig = {
      host: 'ftp.crossix.com',
      port: '21'
    },

    // login info for ftp connection
    ftpAuth = {
      user: 'mwigmanich',
      pass: 'Etruf6b8'
    };


// NOTE: this error means you're not on VPN:
// Error on ftp socket: Error: getaddrinfo ENOENT

// log onto media server
// change to the correct directory
// create a new directory

// A method for changing the remote working directory and creating one if it doesn't already exist
function ftpCwd(inPath, cb) {
  ftp.raw.cwd(inPath, function(err) {
    if(err){
      ftp.raw.mkd(inPath, function(err) {
        if(err) {
          log.error('Error creating new remote folder ' + inPath + ' --> ' + err);
          cb(err);
        } else {
          log.ok('New remote folder created ' + inPath.yellow);
          ftpCwd(inPath, cb);
        }
      });
    } else {
      cb(null);
    }
  });
}

// ftp files to remote server
exports.pushToRemoteServer = function(filePaths, dirname, env) {

  dirname = 'newDirectoryName';


  // console.log('begin release...');
  // console.log(filePaths);

  // start ftp session
  var ftp = new jsftp(ftpConfig);

  ftp.auth(ftpAuth.user, ftpAuth.pass, function(err, res) {

    // change to the microsite directory of requested environment
    ftp.raw.cwd(remoteServerPathMap[env], function(err, res) {

      if (err) return console.error(err);

      console.log(res.text);

    });

    // list present working directory
    ftp.raw.pwd(function(err, res) {

      if (err) return console.error(err);

      console.log(res.text);

    });

    // Listing a directory
    // ftp.ls(remoteServerPathMap[env], function(err, files){
    //   if (err) return console.error(err);
    //   _.each(files, function(file) {
    //     if (typeof file !== 'undefined') {
    //       console.log( typeMap[file.type] );
    //     }
    //   });
    // });

    // attempt to create a directory
    ftp.raw.mkd(dirname, function(err, res) {

      if (err) {
        if (err.code === 550) {
          console.log('dir already exists');
        } else {
          return console.error(err);
        }
      }

      console.log(res);

    });

    // log out
    ftp.raw.quit(function(err) {

      if (err) { return console.log(err); }

      // all done
      return console.log('quitting ftp');

    });

  });

  // Authentication and main processing of files
  // ftp.auth(ftpAuth, function(err) {

  //   if (err) {
  //     console.log('Authentication ' + err);
  //   }

  //   ftp.raw.quit(function(err) {
  //     if (err) {
  //       log.error(err);
  //     } else {
  //       log.ok('FTP upload done!');
  //     }
  //     done();
  //   });

  // });


};


