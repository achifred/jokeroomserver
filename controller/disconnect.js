const { removeUser } = require('./users');

const disconnect = (socket, io) => {
  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('message', {
        user: 'admin',
        text: `${user.name} left`
      });
    }
  });
};

module.exports = { disconnect };
