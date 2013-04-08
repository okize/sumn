// modules
var micrositeListJson = process.cwd() + '/lib/data/micrositeList.json',
    micrositeList = require(micrositeListJson),
    msg = require(process.cwd() + '/lib/modules/messaging.js'),
    fs = require('fs'),
    _ = require('underscore');

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
function saveMicrositeList(callback) {

  fs.writeFile(micrositeListJson, JSON.stringify(micrositeList, null, 2), function(err) {

    if (err) {
      return msg.err(err);
    } else {
      if (typeof callback === 'function') {
        return callback.call(this);
      }
    }

  });

}

// returns micrositeList object
exports.getMicrositeListObject = function() {

  return micrositeList;

};

// returns an array of microsite names
exports.getMicrositeList = function(status) {

  var microsites = micrositeList.sites,
      list = _.keys(microsites),
      sites = [];

  // iterrate through the microsite list and filter according to args.status
  for (var i = 0, len = list.length; i < len; i++) {

    if (status === 'active' && microsites[ list[i] ].isActive) {
      sites.push( list[i] );
    } else if (status === 'retired' && !microsites[ list[i] ].isActive) {
      sites.push( list[i] );
    } else if (typeof status === 'undefined') {
      sites.push( list[i] );
    }

  }

  return sites;

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
    return msg.con('error', 'siteDoesNotExist', sitename);
  }

};

// returns a list of all the microsite directories
exports.getAllSiteDirs = function(status) {

  // for now, type will just be active sites
  status = 'active';

  var microsites = micrositeList.site,
      list = _.keys(microsites),
      directories = [];

  for (var i = 0, len = list.length; i < len; i++) {

    if (microsites.list[i].isActive) {
      directories.push( microsites.list[i].siteDirectory );
    }

  }

  return directories;

};

// add a new site to micrositeList
exports.addNewSite = function(sitename, dirname) {

  micrositeList.sites[sitename] = new Microsite(sitename, dirname);
  saveMicrositeList(sitename + ' created');
  saveMicrositeList();

};

// updates the property of a site in micrositeList
exports.updateSiteProperty = function(sitename, property, value, successMessage) {

  // bail if the property doesn't exist
  if (!micrositeList.sites[sitename].hasOwnProperty(property)) {
    return msg.con('error', 'notValidProperty', property);
  }

  micrositeList.sites[sitename][property] = value;

  saveMicrositeList( function() {

    // log message on success
    return msg.con('info', 'genericMessage', successMessage);

  });

};