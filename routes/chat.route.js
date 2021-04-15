const router = require('express').Router();
const authGuard = require('./guards/auth.guard');
const chatController  = require('../controllers/chat.controller')

router.get('/:id',authGuard.isUser,chatController.getChat)


module.exports = router; 