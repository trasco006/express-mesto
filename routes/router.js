const router = require('express').Router();
const cardsRoutes = require('./cards.js');
const usersRoutes = require('./users.js');

router.use('/', cardsRoutes);
router.use('/', usersRoutes);
router.use('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});
module.exports = router;
