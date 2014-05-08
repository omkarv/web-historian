var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var url = require('querystring');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};


exports.serveIntro = function(res) {
  res.writeHead(200, exports.headers);
  exports.serveAssets(res, 'index');
};

exports.send404 = function(res) {
  res.writeHead(404, exports.headers);
  res.end('Not Found');
};

exports.queryArchive = function(res, req) {

  var pathname = url.parse(req);
  // console.log('querystring is of request ' +pathname);
  var body = "";
  req.on('data', function (chunk) {
    body += chunk;
  });
  req.on('end', function () {
    var reqURL = body.substr(4);
    console.log('POSTed: ' + reqURL);
    res.writeHead(200, exports.headers);
    exports.serveAssets(res, 'loading');
    archive.isURLArchived(res, reqURL);
  });
  // console.log(res);
  ;
};

exports.serveAssets = function(res, asset) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...), css, or anything that doesn't change often.)
  var page = "";
  var assetLookup = {
    index : archive.paths.siteAssets + '/index.html',
    loading:  archive.paths.siteAssets + '/loading.html',
  };
  var location = "";
  if(!assetLookup[asset]) {
    location = archive.paths.archivedSites + '/' + asset;
    console.log('location is:' +location);
  } else {
    location = assetLookup[asset];
  }
  fs.readFile(location, function(err, data){
    console.log('location is ' + location);
    if(err) {
      console.log(err);
      // throw 'error!';
    }
    page += data;
    //console.log(page);
    res.end(page);
  });

};

// As you progress, keep thinking about what helper functions you can put here!
