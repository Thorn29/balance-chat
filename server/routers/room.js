const express = require('express');
const router = new express.Router();
const authMiddleware = require('../middleware/auth');
const Room = require('../models/room');


router.get('/chatroom', async(req, res) => {
  const rooms = await Room.find().populate('author');
  if (!rooms) return res.status(400);
  res.status(200).send(rooms);
  });

router.post('/chatroom', authMiddleware, async(req, res) => {
  const { title, desc } = req.body;
  const { _id } = req.user;
  const room = new Room({ title: title, desc: desc, author: _id });
  room.save().then(() => res.status(200).send(room)).catch((err) => res.status(500).send(err));
});

router.get('/chatroom/:roomid', authMiddleware, async(req, res) => {
  const { roomid } = req.params;
  if (roomid.length !== 24) return res.status(400).send();
  const room = await Room.findOne({ _id: roomid });
  if (!room) return res.status(400).send("Room doesn't exist");
  res.status(200).send(room);
});

router.patch('/chatroom/:roomid', authMiddleware, async(req, res) => {
  const { id } = req.user;
  const { roomid } = req.params;
  if (roomid.length !== 24) return res.status(400).send('Invalid room ID');

  const updates = Object.keys(req.body);
  const allowedUpdates = ['title', 'desc'];
  const isValid = updates.every(item => allowedUpdates.includes(item));
  if (!isValid) return res.status(400).send('Invalid update request');

  try {
    const room = await Room.findOneAndUpdate({ _id: roomid, author: id }, req.body, { new: true, runValidators: true });
    if (!room) return res.status(400).send('This room is invalid');
    res.status(200).send(room);
  }

  catch (e) {
    res.status(500).send('An error occured');
  }
});

router.delete('/chatroom/:roomid', authMiddleware, async(req, res) => {
  const { id } = req.user;
  const { roomid } = req.params;
  if (roomid.length !== 24) return res.status(400).send('Invalid room ID');

  try {
    const room = await Room.findOneAndDelete({ _id: roomid, author: id });
    if (!room) return res.status(400).send("Invalid delete request");
    res.status(200).send(room);
  }

  catch(err) {
    res.status(500).send('Something went wrong');
  }
});


module.exports = router;
