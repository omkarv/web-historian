var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var helpers = require('../web/http-helpers');
var http = require('http-request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : '../archives/sites',
  'list' : path.join(__dirname, '../archives/sites.txt') //__dirname evaluates to the directory in ehich the js file is contained
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(){
    var file = '';
    fs.readFile(exports.paths['list'], function(err, data){
      if(err) {
        throw 'error!';
      }
      file += data;
      return file;
    });
};

exports.isUrlInList = function(url){
  var file = exports.readListOfUrls;
  if(file.search(url) >= 0) {
    console.log('url in list');
    return true;
  } else {
    console.log('url not in list');
    //write to list
    exports.addUrlToList(url);
    return false;
  }
};

exports.addUrlToList = function(url){
  fs.appendFile(exports.paths['list'], url, function (err) {
    if (err) throw err;
    console.log('The url: ' + url + ' was appended to file!');
  });
  // exports.downloadUrls([url]);
};

exports.isURLArchived = function(res, url){
  path.exists(path.join(exports.paths['archivedSites'], url), function(exists) {
    if (exists) {
      console.log('it is archived, woo!');
      //serve up the archived page -> return control to http-helpers
      // exports.downloadUrls();
      helpers.serveAssets(res, url);
    } else{
      console.log('boo hoo it doesnt exist');
      //add the URL to the list
      helpers.serveAssets(res, 'loading');
      // exports.addUrlToList(url);
      //add missing url to pending downloading url list

    }
  });
};

exports.downloadUrls = function(list){
  //takes an array of urls
  _.each(list, function(url){
    http.get(url, function (err, res) {
      if (err) {
        console.error(err);
        return;
      }
      var website = res.buffer.toString();
      fs.writeFile(path.join(exports.paths.archivedSites, url), website, function (err) {
        if (err) throw err;
        console.log('It\'s saved!');
      });
    });
  });
  //archives the websites
};
