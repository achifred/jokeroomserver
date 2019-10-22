const { getUser, getUserInRoom } = require('./users');

const sendMessage = (socket, io) => {
  socket.on('sendMessage', (message, cb) => {
    const user = getUser(socket.id);
    io.to(user.room).emit('message', { user: user.name, text: message });
    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUserInRoom(user.room)
    });
    cb();
  });
};

module.exports = { sendMessage };
