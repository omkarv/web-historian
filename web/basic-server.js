var http = require("http");
var helpers = require('./http-helpers.js');
var handler = require("./request-handler");
var urlParser = require("url");
var port = 8080;
var ip = "127.0.0.1";
var routes = {
  '/': handler.handleRequest
};
var server = http.createServer(
  function(req, res) {
    var url = urlParser.parse(req.url);
    var route = routes[url.pathname];
    // console.log(url);
    if(route) {
      route(req, res);
    } else {
      helpers.send404(res);
    }
  }
);//handler.handleRequest);
//if
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);

//this should contain the routing information
