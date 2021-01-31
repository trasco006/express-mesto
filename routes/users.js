const router = require('express').Router()
const path = require('path');
const fs = require('fs');

router.get('/users', (req, res) => {
  fs.readFile(path.join ('data/users.json'), {encoding: 'utf8'}, (err, data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      const users = JSON.parse(data)
      res.send(users)
    }
  })
})

router.get('/users/:id', (req, res) => {
    fs.readFile(path.join('data/users.json'), {encoding: 'utf8'}, (err, data) => {
      if (err) {
        res.status(500).send(err.message)
      } else {
        const users = JSON.parse(data)
        const currentUser = users.find(currentValue=>{
          return currentValue._id === req.params.id
        })
        if (currentUser) {
          res.send(currentUser)
        } else {
          res.status(404).send({"message": "Нет пользователя с таким id"})
        }
      }
    })
  }
)
module.exports = router
