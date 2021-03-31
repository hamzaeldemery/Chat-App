const router = require('express').Router();
const authGuard = require('./guards/auth.guard');
const bodyParser = require('body-parser').urlencoded({extended:true});
const friendController = require('../controllers/friends.controller')

router.post('/accept',authGuard.isUser,bodyParser,friendController.acceptRequest);
router.post('/reject',authGuard.isUser,bodyParser,friendController.rejectReqeust);
router.post('/cancel',authGuard.isUser,bodyParser,friendController.cancelRequest);
router.post('/delete',authGuard.isUser,bodyParser,friendController.deleteFriend);


module.exports = router; 