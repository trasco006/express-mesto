const router = require('express').Router()
const {getUsers, getProfile, createUser, updateUserProfile, updateUserAvatar} = require('../controllers/users')


router.get('/users', getUsers);
router.get( '/users/:userId', getProfile);
router.post('/users', createUser);
router.patch('/users/me', updateUserProfile);
router.patch('/users/me/avatar', updateUserAvatar);
module.exports = router
