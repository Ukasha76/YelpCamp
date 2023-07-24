const campground = require('../models/campground')
const { cloudinary } = require('../cloudinary')
module.exports.index = async (req, res, next) => {
    const alldata = await campground.find({})
    res.render('campground/index', { alldata })
}
module.exports.make_new = (req, res) => {
    res.render('campground/new')
}
module.exports.newcamp = async (req, res, next) => {
console.log(req.params)
    const newcamp = new campground(req.body.campground)
    newcamp.images = req.files.map(f => ({ url: f.path, filename: f.filename }))

    newcamp.author = req.user._id;
    await newcamp.save()
    console.log(newcamp)
    req.flash('success', 'campground created successfully')
    res.redirect(`/campgrounds/${newcamp._id}`)
}
module.exports.make_edit = async (req, res, next) => {
    const { id } = req.params;
    const foundcamp = await campground.findById(id);
    res.render('campground/edit', { foundcamp })
}
module.exports.do_edit = async (req, res, next) => {

    const { id } = req.params;
    const newcamp = await campground.findByIdAndUpdate(id, req.body.campground)

    const images = req.files.map(f => ({ url: f.path, filename: f.filename }))
    newcamp.images.push(...images)

    if(req.body.Delete){
        for(let files of req.body.Delete)
        {
           await cloudinary.uploader.destroy('files')
        }
    await newcamp.updateOne({$pull:{images:{filename:{$in:req.body.Delete}}}})
    }
    newcamp.save()
    req.flash('success', 'campground Edited successfully')
    res.redirect(`/campgrounds/${newcamp._id}`)


}
module.exports.showcamps = async (req, res, next) => {
    const { id } = req.params;
    const camp = await campground.findById(id)
        .populate({
            path: 'reviews',
            populate: {
                path: 'author'
            }
        })
        .populate('author')
    current_user = req.user
    if (!camp) {
        req.flash('danger', 'Campground does not exist')
        return res.redirect('/campgrounds')
    }
    res.render('campground/showcamps', { camp, current_user })
}
module.exports.deletecamp = async (req, res, next) => {
    const { id } = req.params;
    await campground.findByIdAndDelete(id);
    req.flash('danger', 'campground deleted successfully')
    res.redirect(`/campgrounds`)
}
