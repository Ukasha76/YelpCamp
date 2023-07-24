const mongoose = require('mongoose')
const Review = require('./review');
const { func } = require('joi');
const { Schema } = mongoose;
const image = new Schema({
    
        url: String,
        filename: String
    
})
image.virtual('thumbnail').get(function(){
   return this.url.replace('/upload','/upload/w_200')
})
const campgroundschema = new Schema({
    tittle: String,
    images: [image],
    price: Number,
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
})
campgroundschema.post('findOneAndDelete', async (doc) => {
    if (doc) {
        await Review.deleteMany({ _id: { $in: doc.reviews } })
    }
})
const Campground = new mongoose.model('Campground', campgroundschema)
module.exports = Campground;