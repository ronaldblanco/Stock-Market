'use strict';

var express = require('express');
var routes = require('./app/routes/index.js');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');

var app = express();

require('dotenv').load();
require('./app/config/passport')(passport);

mongoose.connect(process.env.MONGO_URI);
mongoose.Promise = global.Promise;

app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/common', express.static(process.cwd() + '/app/common'));

app.use(session({
	secret: 'secretClementine',
	resave: false,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
//app.use(io);//WEBSOCKE

routes(app, passport);

//WEBSOCKE
var server = require('http').createServer(app);
var io = require('socket.io')(server);
io.on('connection', function(socket){
	socket.on('event', function(data) {
        console.log('A client sent us this dumb message:', data.message);
    });
	console.log('socked.io->New Client Connected');
	socket.emit('announcements', { message: 'A new user has joined!' });
});
//WEBSOCKE

var port = process.env.PORT || 8080;
/*app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});*/
server.listen(port,  function () {
	console.log('Node.js with WebSocket listening on port ' + port + '...');
});
