const express   = require('express');
const app       = express();
const WebSocket = require('ws');
const cors      = require('cors');
const http      = require('http');
app.use(cors());
const server    = require('http').createServer(app);

const PORT = 4000;
server.listen(
  PORT,
  () => console.log(`Listening on ${PORT}`)
);

const wss = new WebSocket.Server({server: app});

let userCount = 0;

wss.on('connection', (ws) => {
  console.log('New Client Connected');
  userCount ++;
  console.log({userCount: userCount});

  wss.clients.forEach(function each(client) {
      client.send(JSON.stringify({
        type: "updateUserCount",
        userCount: userCount
      }));
  });

  ws.on('close', (ws) => {
    console.log('Client disconnected');
    userCount --;
    console.log({userCount: userCount});

    wss.clients.forEach(function each(client) {
        client.send(JSON.stringify({
          type: "updateUserCount",
          userCount: userCount
        }));
    });
  });

});

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};
