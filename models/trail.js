const mongoose = require('mongoose');

const trailSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
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
  },
  routeType: {
    type: String,
  },
  favoritedByUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }]
});

const Trail = mongoose.model('Trail', trailSchema);

module.exports = Trail;