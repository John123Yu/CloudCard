var mongoose = require( 'mongoose' ),
    express  = require( 'express' ),
    bp       = require('body-parser'),
    path     = require( 'path' ),
    root     = __dirname,
    port     = process.env.PORT || 8000,
    app      = express(),
    mailer   = require('express-mailer')

require('./server/config/mongoose.js');

var Schema = mongoose.Schema;
var User = mongoose.model('User');

var bcrypt = require('bcryptjs');
 
mongoose.Promise = global.Promise;
app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());

require('./server/config/routes.js')(app);

app.use( express.static( path.join( root, 'client' )));
app.use( express.static('/'));
app.use( express.static('/imagesPath'));
app.use( express.static( path.join( root, 'bower_components' )));
app.use(bp.json())

var server = app.listen( port, function() {
  console.log( `server running on port ${ port }` );
});

// var io = require('socket.io').listen(server);
// io.sockets.on('connection', function (socket){
// socket.on('create', function(room) {
// 	  	socket.join(room);
// 	  	io.sockets.in(room).emit('new_message', "hello");
// 	});

// 	socket.on('unsubscribe', function(room) { 
// 		socket.leave(room); })
// })