var express = require('express'), 
	url = require('url'), 
	http = require('http');

/**** 
 * 
 * Config parameters
 * 
 * */

var conf = require('./config/conf.json');

var webappPath = '/app';
var serverListenHost = conf.host; // can be modified
var serverListenPort = conf.port; // can be modified

/**** 
 * 
 * Forward & dispatch service logic
 * 
 * */

var app = express();

// Serve AngularJS webapp static resources (i.e. HTML, JS, CSS, etc ...)
app.use(express.static(__dirname + webappPath));

/**** 
 * 
 * HTTP Server start
 * 
 * */
var server = http.createServer(app).listen(serverListenPort, serverListenHost, function() {
	console.log('Running on http://'+serverListenHost+':'+serverListenPort+'/');
});