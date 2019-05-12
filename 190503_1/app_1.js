var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const HTML_PATH = '/html';  // HTML(Page) Path
const SERVER_PORT = 3000;   // Server Port Number

// socket.io
// namespace - create rooms
var count=1;
const namespace1 = io.of('/namespace1');
namespace1.on('connection', function(socket){
  console.log('enterd : ', namespace1.name); // namespace name
  console.log('user connected: ', socket.id); // (namespace name)#(socket id)
  var name = "user" + count++;

  namespace1.emit('news', { username: name, data: 'hello' });

  // socket.io disconnect user
  namespace1.on('disconnect', function(){
    console.log('user disconnected: ', socket.id);
  });
});

const namespace2 = io.of('/namespace2');
namespace2.on('connection', function(socket){
  console.log('enterd : ', namespace2.name); // namespace name
  console.log('user connected: ', socket.id); // (namespace name)#(socket id)
  var name = "user" + count++;

  namespace2.emit('news', { username: name, data: 'hello' });

  // socket.io disconnect user
  namespace2.on('disconnect', function(){
    console.log('user disconnected: ', socket.id);
  });
});

// Direct URL
app.get('/', function(req, res) {
  res.sendFile(__dirname + HTML_PATH + '/enterchat.html');
  //res.send('Hello World!');
});

// Start Node JS : npm start
// Port : SERVER_PORT
http.listen(SERVER_PORT, function () {
  console.log('Server Start');
  console.log('Port : ' + SERVER_PORT);
});
