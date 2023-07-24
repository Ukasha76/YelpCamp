require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');
const ejsmate = require('ejs-mate');
const methodOverride = require('method-override');
const User = require('./models/User');
const campground_router = require('./routers/campgrounds');
const review_router = require('./routers/review');
const user_router = require('./routers/user');
const session = require('express-session');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const ExpressError = require('./utilties/ExpressErrors');
const mongoSanitize = require('express-mongo-sanitize');
const { func } = require('joi');
const MongoStore = require('connect-mongo')
// const dbUrl= process.env.DB_URL;

app.use(mongoSanitize());

mongoose
  .connect('mongodb://127.0.0.1:27017/firstapp')
  .then(() => {
    console.log('Mongoose listening');
  })
  .catch(err => {
    console.log('Error');
    console.log(err);
  });
  const secret = process.env.SECRET ||  'iamasecret'
const store = new MongoStore({
   mongoUrl:'mongodb://127.0.0.1:27017/firstapp',
   secret,
   touchAfter:24*60*60

})
store.on("error",function(e){
   console.log("session stroe error")
})
const oneday = 1000 * 60 * 60 * 24 * 7;
const session_obj = {
   store,
  name: 'ukasha',
  secret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    // secure:true,
    expires: Date.now() + oneday,
    maxAge: oneday
  }
};

app.engine('ejs', ejsmate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(session_obj));
app.use(passport.session());
app.use(passport.initialize());

// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.flashmessages = req.flash();
  next();
});

app.use('/campgrounds', campground_router);
app.use('/campgrounds/:camp_id/review', review_router);
app.use('/', user_router);

app.get('/', (req, res) => {
  current = req.user;
  res.render('users/home', current);
});

app.all('*', (req, res, next) => {
  next(new ExpressError('page not found', 404));
});

app.use((err, req, res, next) => {
  const { statuscode = 500 } = err;
  if (!err.message) err.message = 'something wents wrong';
  res.status(statuscode).render('errortemplate', { err });
});

app.listen('3000', () => {
  console.log('Listening on Port 3000');
});
