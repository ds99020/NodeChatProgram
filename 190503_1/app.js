var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const HTML_PATH = '/html';  // HTML(Page) Path
const SERVER_PORT = 3000;   // Server Port Number

// socket.io
// room
let room = ['room1', 'room2'];
let a = 0;

io.on('connection', (socket) => {

  socket.on('joinRoom', function(num, name){
    socket.join(room[num], function(){
      console.log(name + ' join a ' + room[num]);
      io.to(room[num]).emit('joinRoom', num, name);
    });
  });

  socket.on('leaveRoom', function(num, name){
    socket.leave(room[num], function(){
      console.log(name + ' leave a ' + room[num]);
      io.to(room[num]).emit('leaveRoom', num, name);
    });
  });

  socket.on('chat message', function(num, name, msg){
    a = num;
    io.to(room[a]).emit('chat message', name, msg);
  });


  socket.on('disconnect', function(){
    console.log('user disconnected: ', socket.id);
  });

/*
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  // socket.io disconnect user
  socket.on('disconnect', function(){
    console.log('user disconnected: ', socket.id);
  });
*/
});




// Direct URL
app.get('/', function(req, res) {
  res.sendFile(__dirname + HTML_PATH + '/room.html');
  //res.send('Hello World!');
});

// Start Node JS : npm start
// Port : SERVER_PORT
http.listen(SERVER_PORT, function () {
  console.log('Server Start');
  console.log('Port : ' + SERVER_PORT);
});
