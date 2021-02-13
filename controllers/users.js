const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
const getProfile = (req, res) => {
  const id = req.params.userId;
  User.findById(id)
    .orFail(new Error('NotFound'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные.' });
      } else if (err.name === 'NotFound') {
        res.status(404).send({ message: 'Объект не найден' });
      } else {
        res.status(500).send({ message: 'Ошибка сервера' });
      }
    });
};
const createUser = (req, res) => {
  const { body } = req;
  User.countDocuments({})
    .then((count) => {
      User.create({ ...body, id: count })
        .then((user) => res.status(200).send(user))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            res.status(400).send({ message: err.message });
          } else {
            res.status(500).send({ message: err.message });
          }
        });
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};
const updateUserProfile = (req, res) => {
  const { body } = req;
  User.findByIdAndUpdate({ _id: req.user._id }, { name: body.name, about: body.about })
    .orFail(() => {
      Error('DocumentNotFoundError');
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные.' });
      } else if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: 'Объект не найден' });
      } else {
        res.status(500).send({ message: 'Ошибка сервера' });
      }
    });
};
const updateUserAvatar = (req, res) => {
  const { body } = req;
  User.findByIdAndUpdate({ _id: req.user._id }, { avatar: body.avatar })
    .orFail(() => {
      Error('DocumentNotFoundError');
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные.' });
      } else if (err.name === 'NotFound') {
        res.status(404).send({ message: 'Объект не найден' });
      } else {
        res.status(500).send({ message: 'Ошибка сервера' });
      }
    });
};

module.exports = {
  getUsers, getProfile, createUser, updateUserAvatar, updateUserProfile,
};
