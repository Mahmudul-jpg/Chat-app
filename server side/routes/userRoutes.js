const express = require('express');
const { registerUser } = require('../controllers/controller')
const router = express.Router()
router.route('/').post(registerUser)
// router.get('/login')
module.exports = router