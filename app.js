const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// Parse command line arguments
const argv = require('yargs').argv;
const port = argv.port || 3000;
const delayMs = argv.delay || 5000;

http.listen(port, () => console.log(`Listening on port ${port}
Added delay of ${delayMs}ms`));

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
    socket.emit('init-session');
    master = socket;
  } else {
    socket.emit('join-session');
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
