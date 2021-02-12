const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 30,
    minlength: 2,
  },
  link: {
    type: String,
    required: true,
    match: /((http)|(https)):\/\/.+\..+/,
  },
  owner: {
    required: false,
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
  likes: {
    type: [{
      type: mongoose.Types.ObjectId,
      ref: 'User',
    }],
    default: [],
    required: true,
  },
  createdAt: {
    required: true,
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
