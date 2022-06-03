const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async(req, res, next) => {
  const rawToken = req.header('Authorization');
  if (!rawToken) return res.status(400).send('Not authenticated');

  const token = rawToken.replace('Bearer ', '');
  const data = jwt.verify(token, process.env.JWT_SECRET);
  if (!data.id) return res.status(400).send('Invalid user');

  const user = await User.findOne({ _id: data.id });
  if (!user) return res.status(400).send('Invalid user');

  req.user = user;
  next();
};

module.exports = auth;
