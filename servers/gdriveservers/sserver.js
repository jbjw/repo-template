var debug = require('debug')('test:server'),
    fs = require( 'fs' ),
    https = require("https"),
    app = require('../src/index'),
    PORT = 9433,
    options,
    server;

try {
    options = {
      key: fs.readFileSync('secret/key.pem'),
      cert: fs.readFileSync('secret/cert.pem')
    };
} catch(e) {
    console.log('error reading security key/cert');
}

if (options) {
    server = https.createServer(options, app);
    server.listen(PORT, function() {
        debug('Express app now running secure https on port: ' + PORT);
    });
} else {
    console.log('no security key/cert options');
}
