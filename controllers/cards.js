const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then(cards => res.status(200).send(cards))
    .catch(err => res.status(500).send(err))
}

const addCard = (req, res) => {
  const {body} = req
  Card.create(body)
    .then(card => res.status(200).send(card))
    .catch(err => res.status(500).send(err))
}

const deleteCard = (req, res) => {
  Card.findOne({_id: req.params.cardId})
    .then(card => {
      Card.deleteOne({_id: req.params.cardId})
        .then(res.status(200).send('Карточка удалена.'))
        .catch(err => res.status(500).send(err))
    })
    .catch(res.status(500).send('Карточки с таким id не существует.'))
}

const likeCard = (req, res)=>{
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
}

const dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)

module.exports = {getCards, addCard, deleteCard, likeCard, dislikeCard}