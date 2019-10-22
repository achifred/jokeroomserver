const express = require('express');
const socketio = require('socket.io');
const http = require('http');
//const { addUser, getUser, removeUser, getUserInRoom } = require('./users');

const PORT = process.env.PORT || 5000;
const router = require('./router');
const app = express();
const cors = require('cors');
const server = http.createServer(app);

const io = socketio(server);
const { Onjoin } = require('./controller/join');
const { sendMessage } = require('./controller/sendmessage');
const { disconnect } = require('./controller/disconnect');

io.on('connection', socket => {
  Onjoin(socket, io);

  sendMessage(socket, io);

  disconnect(socket, io);
});

app.use(router);
app.use(cors);

module.exports = { server };
