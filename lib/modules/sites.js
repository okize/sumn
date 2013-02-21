// modules
var micrositeListJson = process.cwd() + '/lib/micrositeList.json',
    micrositeList = require(micrositeListJson),
    fs = require('fs');

// microsite constructor
function Microsite(sitename, dirname) {
  this.isActive = true,
  this.createDate = Date.now(),
  this.siteDirectory = dirname,
  this.isEmbedded = false,
  this.url = '',
  this.urlPreview = 'http://preview.techtarget.com:8080/' + sitename,
  this.releases = {
    count: 0,
    last: 0
  };
}

// saves whatever current value of micrositeList is to micrositeList.json
function saveMicrositeList(successMessage) {

  fs.writeFile(micrositeListJson, JSON.stringify(micrositeList, null, 2), function(err) {

    if (err) {
      // return console.error(clc.error(err));
      return console.error(err);
    } else {
      // return console.log(clc.info(msg.siteRetired), sitename);
      return console.log(successMessage);
    }

  });

}

// returns micrositeList object
exports.getMicrositeListObject = function() {
  return micrositeList;
};

// returns an array of microsite names
exports.getMicrosites = function() {
  return micrositeList;
};

// check if sitename already exists in micrositeList
exports.doesSiteExist = function(sitename) {
  return micrositeList.sites.hasOwnProperty(sitename);
};

// check if sitename is active or retired
exports.isSiteActive = function(sitename) {
  return micrositeList.sites[sitename].isActive;
};

// microsite directory is usually a lowercase version of microsite name
// but not always, so get dir name from micrositeList.json
exports.getSiteDir = function(sitename) {

  var site = micrositeList.sites[sitename];

  if (typeof site !== 'undefined') {
    return site.siteDirectory;
  } else {
    // return console.error(clc.error(msg.error.siteDoesNotExist), sitename);
    return console.error('site does not exist');
  }

};

// add a new site to micrositeList
exports.addNewSite = function(sitename, dirname) {

  micrositeList.sites[sitename] = new Microsite(sitename, dirname);

  saveMicrositeList(sitename + ' created');

};

// updates the property of a site in micrositeList
exports.updateSiteProperty = function(sitename, property, value) {

  // bail if the property doesn't exist
  if (!micrositeList.sites[sitename].hasOwnProperty(property)) {
    // return console.error(clc.error(msg.error.notSiteProperty), property));
    return console.error('not a valid property');
  }

  micrositeList.sites[sitename][property] = value;

  saveMicrositeList('site retired');

};