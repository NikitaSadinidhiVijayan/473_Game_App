const WebSocket = require('ws');
const random = require('lodash/random');

let firebase = require('firebase');

let messages = [];
let active = false;
let current_card = '';
let cards = [];
const INTERVAL = 15000; // time in ms

var config = {
  apiKey: "AIzaSyC1f1JP8qFiNGJyy8Og_cd9VsLTP2bjVCs",
  authDomain: "projectId.firebaseapp.com",
  databaseURL: "trivia-66f08.firebaseio.com",
  storageBucket: "trivia-66f08.appspot.com"
};
firebase.initializeApp(config);

// Get a database reference to our posts
var db = firebase.database();
var ref = db.ref("cards");

// Get a snapshot of the database and fill set variables
ref.on("value", function(snapshot) {
  //console.log(snapshot.val()); // JSON of all objects in cards table
  let obj = snapshot.val();

  for(var k in obj) {
    cards.push(k);
  }

  current_card = cards[cards.length-1];
  console.log(`[Server] Database card total: ${cards.length}`);
  console.log(`[Server] Card ID list: ${cards}`);

}, function (errorObject) {
  console.log("[Server] The read failed: " + errorObject.code);
});

const ws = new WebSocket.Server({
  perMessageDeflate: false,
  port: 3001
});

console.log('websockets server started' );

ws.on('connection', function (socket) {
  console.log('client connection established');
  if (!active) {
    active = true;
    console.log('[Server] Starting Trivia NOW');
  }
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

      // Does not check which cards we've been to, so we could get one's
      // Previous answered by clients or even the same card
      current_card = cards[random(cards.length-1)];
      console.log('[Server] New card: ' + current_card);

      ws.clients.forEach(function (clientSocket) {
        let obj = { "action": "new_card", "data": current_card };
        clientSocket.send(JSON.stringify(obj));
      });
    }
  }, INTERVAL);
}

gameLoop();
