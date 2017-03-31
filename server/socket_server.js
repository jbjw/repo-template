'use strict';

const util = require( 'util' );
// util.inspect()

const ws = require( 'ws' );
const WebSocketServer = ws.Server;

// consider using existing server, check docs

const port = 5000;
const wss = new WebSocketServer( { port: port }, function () {
	console.log( 'server started on port ' + port );
} );

wss.broadcast = function ( data ) {
	wss.clients.forEach( function ( client ) {
		client.send( data );
	} );
};

// wss.handleUpgrade( request, socket, upgradeHead, function( socket ) {

let id = 1;
let count = 0;

wss.on( 'connection', function ( socket ) {
	socket.id = id++;
	console.log( 'connection from: {socket.id} {socket.upgradeReq.connection.remoteAddress}' );
	wss.broadcast( JSON.stringify( { type: 'message', message: socket.id + ' has joined' } ) );
	update();

	// console.log( wss.clients );
	// console.log( 'headers.host: ' + socket.upgradeReq.headers.host );
	// console.log( '.url: ' + socket.upgradeReq.url );

	socket.on( 'message', function ( message, flags ) {
		console.log( 'received message from: ', socket.id, message );
		// console.log( 'with flags: ', flags );
		const msgObj = JSON.parse( message );
		if ( msgObj.type == 'click' ) {
			count++;
			update();
		}
	});

	socket.on( 'close', function () {
		console.log( 'closed ' + socket.id );
		wss.broadcast( JSON.stringify( { type: 'message', message: socket.id + ' has left' } ) );
	} );
	// socket.send( 'hello client, this is server' );
});

function update() {
	const updateObj = {
		type: 'update',
		value: count
	};
	wss.broadcast( JSON.stringify( updateObj ) );
}



// server.close

// socket.close
// socket.pause, .resume
// socket.ping, .pong
// .terminate
// .stream

// what is websocket mask
