const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = 3000;

const delayMs = 5000;

http.listen(port, () => console.log(`Listening on port ${port}`));

app.use(express.static('node_modules/co-editor/dist'));
app.use(express.static('public'));

let master;

io.on('connection', socket => {
  joinSession(socket);
  socket.on('disconnect', () => clientDisconnected(socket));
  socket.on('update', message => updateReceived(socket, message));
});

function joinSession(socket) {
  if (!master) {
    socket.emit('set-master');
    master = socket;
  } else {
    master.emit('request-join-message', null, response => {
      socket.emit('update', response);
    });
  }
}

function clientDisconnected(socket) {
  if (socket === master) {
    socket.broadcast.emit('master-disconnected');
    master = undefined;
  }
}

function updateReceived(socket, message) {
  setTimeout(() => socket.broadcast.emit('update', message), delayMs);
}
