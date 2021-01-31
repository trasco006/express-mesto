const router = require('express').Router();
const fs = require('fs');

router.get('/cards', (req, res)=>{
  fs.readFile('./data/users.json', {encoding: 'utf8'}, (err, data) => {
    const cards = JSON.parse(data)
    res.send(cards)
  })
  }
)

module.exports = router