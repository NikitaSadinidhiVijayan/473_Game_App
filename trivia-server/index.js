const WebSocket = require('ws');
const random = require('lodash/random');

const ws = new WebSocket.Server({
  perMessageDeflate: false,
  port: 3001
});

var messages = [];
var active = false;
var current_card = null;
var cards = ['-KjVZpn1a7zVob3Hmt4y', '-KjVhW7W2bSao01Amh8r', '-KjVj68PhBvyuiS2NiBm'];
var INTERVAL = 15000; // time in ms

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
    if(active) { // Server does nothing until client connects; waste no cards
      current_card = cards[random(2)];
      ws.clients.forEach(function (clientSocket) {
        let obj = { "action": "new_card", "data": current_card };
        clientSocket.send(JSON.stringify(obj));
      });
    }
  }, INTERVAL);
}

gameLoop();
