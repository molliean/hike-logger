const mongoose = require('mongoose');

const tripSchema = mongoose.Schema({
  tripName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  tripDuration: {
    type: String,
  },
  hikes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User.hikeLog',
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
});

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;