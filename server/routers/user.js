const express = require('express');
const router = new express.Router();

const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/auth');
require('../db/mongoose');
const User = require('../models/user');
const Room = require('../models/room');

router.get('/user', authMiddleware, (req, res) => {
  res.status(200).send(req.user);
});

router.post('/register', (req, res) => {
  const user = new User(req.body);
  user.save()
  .then(() => {
    res.send(user)
  })
  .catch((err) => {
    res.status(500).send(err)
  });
});

router.post('/login', async(req, res) => {
  const { username, password } = req.body;
  const user = await User.findAndAuth(username, password);
  if (user.error) return res.status(400).send(user.error);
  res.status(200).send(user);
});

router.get('/users/:id', async(req, res) => {
  const { id } = req.params;
  if (id.length !== 24) return res.status(400).send();

  const user = await User.findOne({ _id: id });
  if (!user) return res.status(404).send('User not found');

  await user.populate('rooms');
  res.send({ user: user, rooms: user.rooms});
});

module.exports = router;
