var path = require('path');
var archive = require('../helpers/archive-helpers');
var http = require('./http-helpers');
// require more modules/folders here!


exports.handleRequest = function (req, res) {

  var httpVerbs = {
    'GET' : http.serveIntro//,
   // 'POST' : queryArchive,
    //'OPTIONS' : options
  };
  var requestVerb = req.method;
  // GET REQUEST
  (httpVerbs[requestVerb])(res);


};

