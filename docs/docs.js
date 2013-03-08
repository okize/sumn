//  modules
var micrositeList = require('../lib/micrositeList.json'),
    cfg = require('../lib/config.json'),
    fs = require('fs'),
    openBrowser = require('open');

var outputPath = process.cwd() + '/docs/javascript/',
    outputFilename = 'microsites.json';

fs.writeFile(outputPath + outputFilename, JSON.stringify(micrositeList, null, 2), function(err) {
  if(err) {
    console.log(err);
  } else {
    console.log('updated ' + outputFilename);
  }
});

// open documentation in browser
openBrowser(cfg.localDocumentationServer, cfg.browser);