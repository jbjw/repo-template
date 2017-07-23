// http://fromanegg.com/post/18352790356/how-to-make-a-nodejs-static-file-server-part-1

var http = require('http');
var path = require('path');
var fs = require('fs');
var util = require('util');

var args = process.argv.splice(process.execArgv.length + 2);

var port = args[0] !== undefined ? args[0] : 8080;

var server = http.createServer(requestHandler);
server.listen(port);

function requestHandler(request, response) {
	var root = "..";
	var url = "";
	var contentType = "text/plain";
	var filePath = "";
	console.log("request recieved " + request.method);
	console.log("request.headers.host: " + request.headers.host);
	console.log("request.url: " + request.url);

	if (request.method !== "GET") {
		response.writeHead(405);
		response.write("");
		response.end("Unsupported request method", "utf8");
		return;
	}

	// handle error instead of checking if file exists

	if ("." + request.url !== "./") {
		filePath = root + request.url;
		fs.open(filePath, serveRequestedFile);
		// path.exists(filePath, serveRequestedFile);
	} else {
		response.writeHead(400);
		response.end('root directory', 'utf8');
		return;
	}
}

function serveRequestedFile(error, file) {
	if (error) {
		response.writeHead(404);
		response.end();
		return;
	}

	var stream = fs.createReadStream(filePath);

	stream.on("error", function(error) {
		response.writeHead(500);
		response.end();
		return;
	});

	var mimeTypes = {
		'.js' : 'text/javascript',
		'.css' : 'text/css',
		'.gif' : 'image/gif'
	}

	contentType = mimeTypes[path.extname(filePath)];
}


console.log("server started on port " + port);
// request
// request.headers
// request.headers.host
