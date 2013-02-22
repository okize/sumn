var fs = require('fs'),
    jshint = require('jshint').JSHINT;

var getJsFiles = function () {

  var js = [
    './lib/app.js',
    './lib/micrositeList.json',
    './lib/modules/cli.js',
    './lib/modules/files.js',
    './lib/modules/messaging.js',
    './lib/modules/purgeCdn.js',
    './lib/modules/sites.js'
  ];

  return js;

};

var files = getJsFiles();

var lint = function (data, filename) {

    if ( jshint( data.toString() ) ) {

      console.log('  ' + filename + ' has no errors.  \033[32m✔\033[39m');

    } else {

      console.log('Errors in file ' + filename);
      var out = jshint.data(),
      errors = out.errors;

      for(var j=0;j<errors.length;j++) {
        console.log(errors[j].line + ':' + errors[j].character + ' -> ' + errors[j].reason + ' -> ' + errors[j].evidence);
      }

    }

};

for (var i = 0, len = files.length; i < len; i++) {

  lint( fs.readFileSync(files[i], 'utf8'), files[i] );

}