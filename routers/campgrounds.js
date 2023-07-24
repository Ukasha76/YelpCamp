
const express = require('express')
const campgrounds = require('../controllers/campgrounds')
const catchasync = require('../utilties/catchasync')
const campground = require('../models/campground')
const { islogedin, isAuthor, validatedata } = require('../middleware/authenticate')
const router = express.Router()
const multer = require('multer')
const { storage }= require('../cloudinary')
const upload = multer({storage});
// const upload = multer({ dest: 'new/' });


router.route('/')
    .get(catchasync(campgrounds.index))
    .post(islogedin,upload.array('images'), validatedata, catchasync(campgrounds.newcamp))


router.get('/new', campgrounds.make_new)

router.route('/:id/edit')
    .get(catchasync(campgrounds.make_edit))
    .put(islogedin, isAuthor,upload.array('images'), validatedata,catchasync(campgrounds.do_edit))
router.get('/:id', catchasync(campgrounds.showcamps))
    .delete('/:id/delete', islogedin, isAuthor, catchasync(campgrounds.deletecamp))




module.exports = router