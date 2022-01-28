const express = require('express');
const { registerUser, authUser } = require('../controllers/controller')
const router = express.Router()
router.route('/').post(registerUser)
router.route('/login').post(authUser)
//router.post('/login',authUser)
module.exports = router