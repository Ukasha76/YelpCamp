const mongoose = require('mongoose');
const {Schema} = mongoose;
const reviewschema = new Schema({
    body:String,
    ratings:Number,
    author:{
        type: Schema.Types.ObjectId,
        ref:'User'
    }
})
const Review = new mongoose.model('Review',reviewschema)
module.exports= Review;