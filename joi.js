const basejoi = require('joi')
// const { validate } = require('./models/User')
const sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
   type: 'string',
   base: joi.string(),
   messages: {
     'string.escapeHTML': '{{#label}} must not include HTML',
   },
   rules: {
     escapeHTML: {
       validate(value, helpers) {
         const clean = sanitizeHtml(value, {
           allowedTags: [], // No tags are allowed, so all tags will be removed
           allowedAttributes: {}, // No attributes are allowed, so all attributes will be removed
         });
 
         if (clean !== value) {
         
           return helpers.error('string.escapeHTML', { value });
         }
 
         return clean;
       },
     },
   },
 });
 
// Extend Joi with the custom rule
const joi=basejoi.extend(extension);

// Now, you can use the 'escapeHTML' rule in your schema to escape HTML in user input


module.exports.campgroundschema =joi.object({
    campground:joi.object({
       tittle:joi.string().required().escapeHTML(),
       location: joi.string().required().escapeHTML(),
       description:joi.string().required().escapeHTML(),
    //    image:joi.string().uri().required()
       price: joi.number().required().min(0)
    }).required(),
    Delete:joi.array()
 })
 

 module.exports.reviewjoi = joi.object({
    review:joi.object({
        body:joi.string().required().escapeHTML(),
        ratings:joi.number().required().min(1).max(5)
    }).required()
})

