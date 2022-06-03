const { addUser, removeUser, readUser, getUsersInRoom } = require('../utils/activeusers');
const Room = require('../models/room');

module.exports = (io) => {
  io.on('connection', (socket) => {
     console.log('Sockets connected');

     socket.on('join', async(data) => {
       if (data.room.length !== 24) return socket.emit('no_room');
       const matchingRoom = await Room.findOne({ _id: data.room });
       if (!matchingRoom) return socket.emit('no_room');
       await matchingRoom.populate('author');

         socket.join(data.room);
         addUser(socket.id, data.username, data.room, data.dbId);
         const onlineUsers = getUsersInRoom(data.room);
         socket.broadcast.to(data.room).emit('new_user', onlineUsers);
         return socket.emit('joined', { room: matchingRoom, online: onlineUsers })
     })

     socket.on('new_message', (message) => {
       const currentUser = readUser(socket.id);
       if (currentUser) {
         const messageData = {...message, author: currentUser.name};
         io.to(currentUser.room).emit('message', messageData);
       }
     });

     socket.on('del_room', (roomid) => {
       socket.broadcast.to(roomid).emit('no_room');
     })

     socket.on('leave', () => {
       const user = removeUser(socket.id);

       if (user) {
         socket.leave(user.room);
         const onlineUsers = getUsersInRoom(user.room);
         return socket.broadcast.to(user.room).emit('user_left', onlineUsers);
       }
     });

     socket.on('disconnect', () => {
       const user = removeUser(socket.id);
       if (user) {
       const onlineUsers = getUsersInRoom(user.room);
       return socket.broadcast.to(user.room).emit('user_left', onlineUsers);
       }
     })
  })
}
