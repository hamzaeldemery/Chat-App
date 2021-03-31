const profileController = require('../controllers/profile.controller');
const router = require('express').Router();
const authGuard = require('./guards/auth.guard')

router.get('/',authGuard.isUser,profileController.profileRedirect);
router.get('/:id',authGuard.isUser,profileController.profileGet);


module.exports = router; 