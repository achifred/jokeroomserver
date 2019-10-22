const { removeUser } = require('./users');

const disconnect = (socket, io) => {
  try {
    socket.on('disconnect', () => {
      const user = removeUser(socket.id);

      if (user) {
        io.to(user.room).emit('message', {
          user: 'admin',
          text: `${user.name} left`
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { disconnect };
