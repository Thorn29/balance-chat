const activeUsers = [];

const addUser = (socketId, username, room, dbId) => {
  if (username) {

    if (username.trim().length <= 0 || room.trim().length <= 0) return { error: 'No username or room found' };
  }

  activeUsers.push({id: socketId, name: username, room: room, originalId: dbId});
}

const removeUser = (id) => {
  const idx = activeUsers.findIndex(user => user.id === id);

  if (idx >= 0) {
    return activeUsers.splice(idx, 1)[0];
  }
}

const readUser = (id) => {
  const matchedUser = activeUsers.find(user => user.id === id);

  if (matchedUser) return matchedUser;
}

const getUsersInRoom = (room) => {
  const newUserList = activeUsers.filter(user => user.room === room);
  return newUserList;
};

module.exports = {
  addUser,
  removeUser,
  readUser,
  getUsersInRoom
}
