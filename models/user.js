const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 30,
    minlength: 2,
    required: true,
  },
  about: {
    type: String,
    maxlength: 30,
    minlength: 2,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
    match: /((http)|(https)):\/\/.+\..+/,
  },
  id: {
    type: String,
  },
});

module.exports = mongoose.model('user', userSchema);
