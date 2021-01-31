const router = require('express').Router();
const path = require('path');
const fs = require('fs');

router.get('/cards', (req, res) => {
    fs.readFile(path.join('data/cards.json'), {encoding: 'utf8'}, (err, data) => {
      if (err) {
        res.status(500).send(err.message)
      } else {
        const cards = JSON.parse(data)
        res.send(cards)
      }
    })
  }
)

module.exports = router