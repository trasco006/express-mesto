const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false
  },
  name: {
    type: String,
    maxlength: 30,
    minlength: 2,
    default: "Жак-Ив Кусто",
    required: false,
  },
  about: {
    type: String,
    maxlength: 30,
    minlength: 2,
    default: "Исследователь",
    required: false,
  },
  avatar: {
    type: String,
    required: false,
    default: "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
    match: /((http)|(https)):\/\/.+\..+/,
  },
  id: {
    type: String,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({email}).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }
          return user; // теперь user доступен
        });
    });
};


module.exports = mongoose.model('user', userSchema);
