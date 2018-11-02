var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
const uuidv4 = require('uuid/v4');

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
      ignored: /node_modules/
    }
  })
  .listen(3000, '0.0.0.0', function (err, result) {
    if (err) {
      console.log(err);
    }

    console.log('Running at http://0.0.0.0:3000');
  });


  // server.js

const express = require('express');
const SocketServer = require('ws').Server;
const WebSocket = require('ws');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
  wss.on('connection', (ws) => {
  console.log('Client connected');
  usersconnected = {
    type: 'incomingInfo',
    content: wss.clients.size
    }
  sendMessage(usersconnected);

  ws.on('message', (data) => {
    let message = JSON.parse(data);
    console.log("received", message);
    if (message.type == "postMessage") {
      message.id = uuidv4();
      message.type = "incomingMessage"
      if (!message.username) {
        message.username = 'Anonymous';
      }
    } else if (message.type == "postNotification") {
      message.id = uuidv4();
      message.type = "incomingNotification"
    }
    sendMessage(message)
  });

  function sendMessage(message) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message));
        console.log("Server sent:", message);
      } else { console.log("not connected", client.readyState, WebSocket.OPEN)}
    });
  }

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});