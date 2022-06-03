const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: [4, 'Name too short'],
    maxlength: [15, 'Name too long'],
    unique: true,
  },
  desc: {
    type: String,
    required: true,
    trim: true,
    minlength: [5, 'Description too short'],
    maxlength: [100, 'Description too long']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
}, { collection: 'rooms' });

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
