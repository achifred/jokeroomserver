const { addUser, getUserInRoom } = require('./users');

const Onjoin = (socket, io) => {
  socket.on('join', ({ name, room }) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    //if (error) return callback(error);

    socket.emit('message', {
      user: 'admin',
      text: `${user.name}, welcome to the room ${user.room}`
    });
    socket.broadcast
      .to(user.room)
      .emit('message', { user: 'admin', text: `${user.name} has joined` });
    socket.join(user.room);
    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUserInRoom(user.room)
    });
    //callback();
  });
};

module.exports = { Onjoin };
