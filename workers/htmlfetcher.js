// eventually, you'll have some code here that uses the code in `archive-helpers.js`
// to actually download the urls you want to download.
// read url list
var _ = require('underscore');
var archive = require('../helpers/archive-helpers');
var path = require('path');
  //for each url in list, check if url is in directory /archive
    //if not add it to the fetch list it and add it to the directory / archive

// archive.readListOfUrls(function(data){ console.log(data);});

_.each(archive.urlList, function(url){
  //for each url in list, check if url is in directory /archive
  // archive.isURLArchived(url);
  path.exists(path.join('../archives/sites', url), function(exists) {
    console.log(url);
    if(!exists) {
      archive.downloadUrl(url);
    }
  });
    //if not add it to the fetch list it and add it to the directory / archive
});
