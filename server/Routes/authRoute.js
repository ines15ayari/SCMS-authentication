const express = require('express')
const Router = express.Router()
const { SignIn, SignUp } = require('../Controllers/authController')

Router.post('/sign-In',SignIn)
Router.post('/sign-Up',SignUp)

module.exports = Router;