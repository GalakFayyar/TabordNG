var express = require('express'), 
	compression = require('compression'), 
	url = require('url'), 
	http = require('http'), 
	httpProxy = require('http-proxy');

/**** 
 * 
 * Config parameters
 * 
 * */

var conf = require('./config/conf.json');

var webappPath = '/app';
var serverListenHost = conf.host; // can be modified
var serverListenPort = conf.port; // can be modified

// backend must be deployed on root (i.e. "/") tomcat context path, or behind some reverse-proxy like nginx 
var backendServiceRootEndpoint = conf.backend_api.url; // can be modified to point to another (remote) host

var backendRestApiEndpointPath = '/api'; // DO NOT modify
var backendRestApiEndpoint = backendServiceRootEndpoint + backendRestApiEndpointPath;

var backendWebsocketEndpointPath = '/ws'; // DO NOT modify
var backendWebsocketEndpoint = backendServiceRootEndpoint + backendWebsocketEndpointPath;

/**** 
 * 
 * Forward & dispatch service logic
 * 
 * */

var app = express();

// REST API http proxy
var proxy_http = httpProxy.createProxyServer({target : backendRestApiEndpoint});
proxy_http.on('error', function (err, req, res) {
	res.writeHead(500, {
	    'Content-Type': 'text/plain'
	});

	res.end('proxy_http: Something went wrong. And we are reporting a custom error message.');
});
proxy_http.on('proxyRes', function(proxyRes, req, res) {
	return res;
});

// Websocket/SockJS proxy
var proxy_sockjs = httpProxy.createProxyServer({target : backendWebsocketEndpoint});
proxy_sockjs.on('error', function (err, req, res) {
	res.writeHead(500, {
	    'Content-Type': 'text/plain'
	});

	res.end('proxy_sockjs: Something went wrong. And we are reporting a custom error message.');
});
proxy_sockjs.on('proxyRes', function(proxyRes, req, res) {
	return res;
});

// Enable server-side gzip compression
app.use(compression());

// Forward API traffic to REST backend
app.use(backendRestApiEndpointPath, function(req, res) {
	console.log('Forward REST API request: ' + url.parse(req.url).pathname);
	proxy_http.web(req, res);
});

// Forward "STOMP over websocket" traffic to pub/sub message broker
app.use(backendWebsocketEndpointPath, function(req, res) {
	proxy_sockjs.web(req, res);
});

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