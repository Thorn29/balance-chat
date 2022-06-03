const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: [4, "Username too short (min 4)"],
    maxlength: [25, "Username too long (max 25)"],
    unique: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid');
      }
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: [6, "Password too short (min 6)"]
  }
}, {
  timestamps: true,
  collection: 'users'
});

userSchema.virtual('rooms', {
  ref: 'Room',
  localField: '_id',
  foreignField: 'author'
});

userSchema.methods.toJSON = function () {
   const user = this;
   const userObject = user.toObject();

   const timeDiff = new Date - (new Date(user.createdAt));
   const days = Math.round(timeDiff / 86400000, 0);
   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

   userObject.days = days;
   userObject.token = token;

   delete userObject.password;
   delete userObject.createdAt;
   delete userObject.updatedAt;

  return userObject;
};


userSchema.statics.findAndAuth = async(username, password) => {

  const profile = await User.findOne({ username: username });
  if (!profile) return { error: 'Invalid credentials' }

  const match = await bcrypt.compare(password, profile.password);
  if (!match) return { error: 'Invalid credentials' }

  return profile;
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model('User', userSchema);


module.exports = User;
