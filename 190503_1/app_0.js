var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const HTML_PATH = '/html';  // HTML(Page) Path
const SERVER_PORT = 3000;   // Server Port Number

// socket.io
// connection Event
var count=1;
io.on('connection', function(socket){
  //socket.io
  console.log('user connected: ', socket.id);
  var name = "user" + count++;
  io.to(socket.id).emit('change name',name);

  socket.on('message', function(msg){
    //var msg = name + ' : ' + text;
    //io.emit('receive message', msg);
    //0console(msg);

    if(msg != null && msg != "") {
      console.log(msg);
      socket.emit('my message', msg);
      socket.broadcast.emit('other message', msg);
    }
  })

  socket.on('send message', function(name,text){
    var msg = name + ' : ' + text;
    console.log(msg);
    io.emit('receive message', msg);
  });

  // socket.io disconnect user
  socket.on('disconnect', function(){
    console.log('user disconnected: ', socket.id);
  });
});

// Direct URL
app.get('/', function(req, res) {
  res.sendFile(__dirname + HTML_PATH + '/client.html');
  //res.send('Hello World!');
});

// Start Node JS : npm start
// Port : SERVER_PORT
http.listen(SERVER_PORT, function () {
  console.log('Server Start');
  console.log('Port : ' + SERVER_PORT);
});
