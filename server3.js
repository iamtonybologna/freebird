const express = require('express');
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

wss.on('connection', (ws) => {
  console.log('New Client Connected');

  // Assign user random color
  let userColor = colors[Math.floor(Math.random() * colors.length)];

  // Count users
  let userCount = 0;
  wss.clients.forEach(function each(client) {
    userCount += 1;
  });

  console.log({userCount: userCount});

  wss.clients.forEach(function each(client) {
      client.send(JSON.stringify({
        type: "updateUserCount",
        userCount: userCount,
        userColor: userColor
      }));
  });

  ws.on('message', function broadcast(data) {
    let parsedData = JSON.parse(data);
    console.log(parsedData);

    switch(parsedData.type) {
      case "postMessage":
        parsedData.type = "incomingMessage";
        wss.clients.forEach(function each(client) {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(parsedData));
          }
        });
        break;
      case "postNotification":
        parsedData.type = "incomingNotification";
        wss.clients.forEach(function each(client) {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(parsedData));
          }
        });
        break;
      default:
        throw new Error("Unknown event type " + data.type);
    }
  });

  ws.on('close', (ws) => {
    console.log('Client disconnected');

    let userCount = 0;
    wss.clients.forEach(function each(client) {
      userCount += 1;
    });
    console.log({userCount: userCount});

    wss.clients.forEach(function each(client) {
        client.send(JSON.stringify({
          type: "updateUserCount",
          userCount: userCount
        }));
    });
  });

})

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};
