const express = require('express');
const router = express.Router();
const { handleMessage } = require('../controllers/chatController');
const sanitizeMiddleware = require('../middleware/sanitizeMiddleware');

router.post('/message', sanitizeMiddleware, handleMessage);

module.exports = router;
