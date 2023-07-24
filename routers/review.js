const express = require('express')
const campground = require('../models/campground')
const catchasync = require('../utilties/catchasync')
const Review = require('../models/review')
const review = require('../controllers/review')
const router = express.Router({ mergeParams: true });
const { islogedin, isreviewAuthor, validatedata_review } = require('../middleware/authenticate')



router.post('/', islogedin, validatedata_review, catchasync(review.make_review))
      .delete('/:rev_id', islogedin, isreviewAuthor, catchasync(review.delete_review))

module.exports = router;