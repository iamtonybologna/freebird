const express   = require('express');
const cors      = require('cors');
const http      = require('http');

const app       = express();
app.use(cors());
const server    = require('http').createServer(app);

const io        = require('socket.io')(server);

io.origins('*:*')

server.listen(4000);
console.log("Server listening on port 4000");

let userCount = 0;

io.on('connection', (client) => {

  console.log('New Client Connected');
  console.log(userCount + ' clients connected!');
  userCount ++;
  io.sockets.emit('broadcast', { description: userCount + ' clients connected!' });


  client.on('event', (data) => {});

  client.on('disconnect', () => {
    userCount --;
    io.sockets.emit('broadcast', { description: userCount + ' clients connected!' });
  });

});