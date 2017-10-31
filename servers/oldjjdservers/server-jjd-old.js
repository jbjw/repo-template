//
'use strict';

var url = require("url");
var path = require("path");
var fs = require("fs");
var http = require("http");

// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
var stripe = require("stripe")("sk_test_rlhtUVJgj6UJ6Rb7qDfaDKxU");

const SUPPORTED_TYPE = {
	'.html': {
		'Content-Type': 'text/html charset = UTF-8'
	},
	'.txt': {
		'Content-Type': 'text/plain; charset = UTF-8'
	},
	'.js': {
		'Content-Type': 'application/javascript; charset = UTF-8'
	},
	'.appcache': {
		'Content-Type': 'text/cache-manifest; charset = UTF-8',
		'Cache-Control': 'no-cache'
	},
	'.css': {
		'Content-Type': 'text/css; charset = UTF-8'
	},
	'.json': {
		'Content-Type': 'application/json; charset = UTF-8'
	},
	'.gif': {
		'Content-Type': 'image/gif'
	}
}

const DEFAULT_TYPE = {'Content-Type': 'text/plain; charset = UTF-8'};
const ERROR_TYPE = {'Content-Type': 'text/plain; charset = UTF-8'};

const ROOT = '../client'
const HOME = '/index.html';
const PORT = 8080;

function serve(req, res) {
	var reqPath = url.parse(req.url).pathname;
	// how is this diff than req.url?

	console.log(req.method + " " + reqPath);

	if (reqPath == "/stripe") {
		console.log("stripe event");
	}
	if (reqPath == "/purchase") {
		console.log("purchase event");
		console.log(req);
		console.log(req.body);
		// Get the credit card details submitted by the form
		var token = req.body.stripeToken; // Using Express

		stripe.customers.create({
			source: token,
			description: 'payinguser@example.com'
		}).then(function(customer) {
			return stripe.charges.create({
				amount: 1000, // Amount in cents
				currency: "usd",
				customer: customer.id
			});
		}).then(function(charge) {
			// YOUR CODE: Save the customer ID and other info in a database for later!
		});

		// YOUR CODE: When it's time to charge the customer again, retrieve the customer ID!

		// stripe.charges.create({
		// 	amount: 1500, // Amount in cents
		// 	currency: "usd",
		// 	customer: customerId // Previously stored, then retrieved
		// });
	}

	var filePath;
	if (reqPath === '/') {
		filePath = ROOT + HOME;
	} else {
		filePath = ROOT + reqPath;
	}

	var ext = path.extname(filePath).toLowerCase();
	var header = SUPPORTED_TYPE[ext] || DEFAULT_TYPE;

	fs.readFile(filePath, function (err, content) {
		if (err) {
			res.writeHead(404, ERROR_TYPE);
			res.write(err.message);
			res.write(' - The page requested is not found.');
			res.end();
		} else {
			res.writeHead(200, header);
			res.write(content);
			res.end();
		}
	});
}

var server = http.createServer(serve);
server.listen(PORT);
console.log("Server running at http://localhost:" + PORT);
