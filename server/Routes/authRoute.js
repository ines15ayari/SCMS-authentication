const express = require('express');
const router = express.Router();
const { signIn, signUp, getUsers, deleteUsers } = require('../controllers/authController');

router.post('/sign-in', signIn);
router.post('/sign-up', signUp);
router.get('/users', getUsers);
router.delete('/users/:id', deleteUsers);

module.exports = router;
