const campground =  require('../models/campground')
const Review = require('../models/review')
module.exports.make_review=async (req, res, next) => {
    const { camp_id } = req.params;
    const reviews = new Review(req.body.review)
    reviews.author= req.user._id;
    const camp = await campground.findById(camp_id)
    camp.reviews.push(reviews)
    await camp.save()
    await reviews.save()
    req.flash('success','Review Added successfully')
    res.redirect(`/campgrounds/${camp._id}`)
 }
 module.exports.delete_review=async (req, res, next) => {
    const { rev_id, camp_id } = req.params;
    await Review.findByIdAndDelete(rev_id);
    const camp = await campground.findByIdAndUpdate(camp_id, { $pull: { reviews: rev_id } }, { new: true })
    await camp.populate('reviews')
    req.flash('danger','Review deleted successfully')
    
    res.redirect(`/campgrounds/${camp._id}`)
 }