const express = require('express')
const router = express.Router()
const User = require('../models/User');
const user = require('../controllers/user')
const catchasync = require('../utilties/catchasync')
const flash = require('connect-flash');
const passport = require('passport');
const ExpressError = require('../utilties/ExpressErrors')


router.route('/register')
    .get(user.get_register)
    .post(catchasync(user.post_register))



router.route('/login')
    .get(user.get_login)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), user.post_login)
router.get('/logout', user.logout)

module.exports = router;





