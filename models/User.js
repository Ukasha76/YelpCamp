const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const passportLocal = require('passport-local')
const passortLocalMongoose = require('passport-local-mongoose')
const { Schema } = mongoose
const UserSchema = Schema({
    email:{
        type: String,
        required:true,
        unique:true
    }
});
UserSchema.plugin(passortLocalMongoose)
const User = mongoose.model('User',UserSchema)
module.exports = User;