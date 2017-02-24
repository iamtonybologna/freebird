const express   = require('express');
const WebSocket = require('ws');

const PORT = 4000;
const app = express()
  .use(express.static('public'))
  .listen(
    PORT,
    '0.0.0.0',
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
