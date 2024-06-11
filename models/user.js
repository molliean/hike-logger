const mongoose = require('mongoose');

const hikeLogSchema = new mongoose.Schema({
  trailName: {
    type: String,
    required: true,
  },
  dateHiked: {
    type: Date,
  },
  location: {
    type: String,
  },
  distance: {
    type: Number,
  },
  elevationGain: {
    type: Number,
  },
  difficulty: {
    type: String,
    enum: ['easy', 'moderate', 'hard'],
  },
  routeType: {
    type: String,
    enum: ['loop', 'out and back'],
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
  trips: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Trip' }],
});

userSchema.set('toObject', {
  transform: (doc, ret) => {
    delete ret.password;
    return ret;
  }
})

const User = mongoose.model('User', userSchema);

module.exports = User;
