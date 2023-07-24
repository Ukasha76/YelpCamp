const express = require('express')
const campground =  require('../models/campground')
const { campgroundschema ,reviewjoi} = require('../joi')
const ExpressError = require('../utilties/ExpressErrors')
const Review = require('../models/review')
module.exports.islogedin =  (req, res, next) =>{
    if (!req.isAuthenticated()) {
      // req.session.redirect=req.originalUrl
      req.flash('danger', 'Login first bruh!!');
      return res.redirect('/login');
    }
    next(); // Call next to proceed to the next middleware or route handler
  };
module.exports.isAuthor = async (req,res,next)=>{
    const { id } = req.params;
    const camp =await campground.findById(id).populate('author');
    if(!camp.author.equals(req.user))
    {
        req.flash('danger','No Authority to do anything')
        return res.redirect(`/campgrounds/${camp._id}`)
    }
    next()
}
module.exports.isreviewAuthor = async (req,res,next)=>{
    const { camp_id,rev_id } = req.params;
    const review =await Review.findById(rev_id).populate('author');
    if(!review.author.equals(req.user))
    {
        req.flash('danger','No Authority to do anything')
        return res.redirect(`/campgrounds/${camp_id}`)
    }
    next()
}
module.exports.validatedata = (req, res, next) => {
  const { error } = campgroundschema.validate(req.body)

  if (error) {

      const msg = error.details.map(el => el.message).join(',')
      throw new ExpressError(msg, 400)
  }
  else {
      next()
  }

}
module.exports.validatedata_review = (req, res, next) => {
  const { error } = reviewjoi.validate(req.body)
  // console.log(error)
  if (error) {

     const msg = error.details.map(el => el.message).join(',')
     throw new ExpressError(msg, 400)
  }
  else {
     next()
  }

}

