const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { NotFoundError,  BadRequestError}= require('../middlewares/errors')

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      if (!users) {
        throw new BadRequestError('Ошибка в запросе')
      }
      res.status(200).send(users);
    })
    .catch((err) => {
      next(err)
    });
};
const getProfile = (req, res, next) => {
  const id = req.params.userId;
  User.findById(id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с таким id не найден')
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      next(err)
    });
};
const createUser = (req, res, next) => {
  User.findOne({email: req.body.email})
    .then((user) => {
      if (user) {
        throw new BadRequestError('Пользователь с таким email уже зарегистрирован')
      }
      bcrypt.hash(req.body.password, 10)
        .then(hash => User.create({
          email: req.body.email,
          password: hash,
        }))
        .then((user) => res.send(user))

    })
    .catch((err) => next(err));
}
const updateUserProfile = (req, res, next) => {
  const {body} = req;
  User.findByIdAndUpdate({_id: req.user._id}, {name: body.name, about: body.about})
    .orFail(() => {
      throw new NotFoundError('Пользователь с таким id не найден')
    })
    .then((user) => res.send({data: user}))
    .catch((err) => {
      next(err)
    });
};
const updateUserAvatar = (req, res, next) => {
  const {body} = req;
  User.findByIdAndUpdate({_id: req.user._id}, {avatar: body.avatar})
    .orFail(() => {
      throw new NotFoundError('Пользователь с таким id не найден')
    })
    .then((user) => res.send({data: user}))
    .catch((err) => {
      next(err)
    });
};
const login = (req, res, next) => {
  const {email, password} = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Неправильный логин или пароль')
      }
      const token = jwt.sign({_id: user._id}, 'some-secret-key', {expiresIn: '7d'});
      res.send({token, user});
    })
    .catch((err) => {
    next(err)
    });
}
const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(()=>{
      throw new NotFoundError('Пользователь не найден')
    })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      next(err)
    });
}

module.exports = {
  getUsers, getProfile, createUser, updateUserAvatar, updateUserProfile, login, getUser
};
