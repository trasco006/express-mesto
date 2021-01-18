const router = require('express').Router()
let users = require('../data/users.json')

router.get('/users', (req, res) => {
  res.send(users)
})

router.get('/users/:id', (req, res) => {
    let a = null;
    users.forEach(item => {
      if (item._id === req.params.id) {
        return a = item
      }
    })
    if (a) {
      res.send(a)
    } else {
      res.status(404)
      res.send({"message": "Нет пользователя с таким id"})
    }
  }
)
module.exports = router
