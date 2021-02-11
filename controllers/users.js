const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).send(users)
    })
    .catch((err) => {
      res.status(500).send(err)
    })
}
const getProfile = (req, res) => {
  const id = req.params.userId
  User.findOne({_id: id})
    .then((user) => {
      res.status(200).send(user)
      if (!user) {
        res.status(404).send({message: 'Нет пользователя с таким id'})
      } else {
        res.status(200).send(user)
      }
    })
    .catch((err) => {
      res.status(500).send(err)
    })
}
const createUser = (req, res) => {
  const {body} = req;
  User.countDocuments({})
    .then((count) => {
      User.create({...body, id: count})
        .then(user => res.status(200).send(user))
        .catch(err => res.status(500).send(err))
    })
    .catch(err => res.status(200).send(err))
}
const updateUserProfile = (req, res) => {
  const {body} = req;
  User.findByIdAndUpdate({_id: req.user._id}, {name: body.name, about: body.about})
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send(err))
}
const updateUserAvatar = (req, res) => {
  const {body} = req;
  User.findByIdAndUpdate({_id: req.user._id}, {avatar: body.avatar})
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send(err))
}

module.exports = {getUsers, getProfile, createUser, updateUserAvatar, updateUserProfile}


