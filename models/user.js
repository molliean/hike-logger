const mongoose = require('mongoose');

const hikeLogSchema = new mongoose.Schema({
  trailName: {
    type: String,
    required: true,
  },
  dateHiked: {
    type: Date,
  },
  favorite: {
    type: Boolean,
  },
})

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  hikeLog: [hikeLogSchema],
});

userSchema.set('toObject', {
  transform: (doc, ret) => {
    delete ret.password; // deletes the password
    return ret; // then just returns the document
  }
})

const User = mongoose.model('User', userSchema);

module.exports = User;
