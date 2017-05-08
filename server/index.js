const WebSocket = require('ws');
const random = require('lodash/random');

const ws = new WebSocket.Server({
  perMessageDeflate: false,
  port: 3001
});

var messages = [];
var active = false;
var current_card;
var cards = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'];
var INTERVAL = 10000; // time in ms

console.log('websockets server started' );

ws.on('connection', function (socket) {
  console.log('client connection established');
  active = true;
  socket.send('Current card: ' + current_card);

  messages.forEach(function (msg) {
    socket.send(msg);
  });

  socket.on('message', function (data) {
    console.log('message received: ' + data);
    messages.push(data);
    ws.clients.forEach(function (clientSocket) {
      clientSocket.send(data)
    });
  });
});

function gameLoop () {
  setInterval(function() {
    if(active) {
      current_card = cards[random(7)];
      ws.clients.forEach(function (clientSocket) {
        clientSocket.send(current_card);
      });
    }
  }, INTERVAL);
}

gameLoop();
