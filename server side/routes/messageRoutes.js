const express = require('express')
const { sendMessage } = require('../controllers/messageControl')
const { protect } = require('../middleware/authMiddleware')
const { allMessages } = require('../controllers/messageControl')
const router = express.Router();
router.route('/').post(protect, sendMessage)
router.route('/:chatId').get(protect, allMessages)
module.exports = router