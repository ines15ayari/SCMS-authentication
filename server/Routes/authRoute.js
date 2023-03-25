const express = require('express')
const Router = express.Router()
const { SignIn, SignUp, GetUsers, DeleteUsers } = require('../Controllers/authController')

Router.post('/sign-In', SignIn);
Router.post('/sign-Up',SignUp)
Router.get('/users',GetUsers);
Router.delete('/users/:id', DeleteUsers);
module.exports = Router;