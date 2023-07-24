const User = require('../models/User');
const catchasync = require('../utilties/catchasync')
const ExpressError = require('../utilties/ExpressErrors')

module.exports.get_register=(req,res)=>{
    // res.send('reached here')
    res.render('login/register')
}
module.exports.post_register=async (req,res)=>{
    try{
    const { username , email ,password }= req.body;
    const user = new User({username,email})
    const register_user = await User.register(user,password)
    req.login(register_user,(err)=>{
        if(err){
           next(err)
        }
        else{
            req.flash('success','Welcome to Campgrounds!!!')
            res.redirect('/campgrounds')
        }
      })
   
    }
    catch(e){
        req.flash('danger','Username or email already exist')
        res.redirect('/register')

    }
}
module.exports.get_login=(req,res)=>{
   
    res.render('login/login')
}
module.exports.post_login=(req,res)=>{
    req.flash('success','Welcome back!!!')
 
    res.redirect( '/campgrounds')
}
module.exports.logout=(req, res) => {
    req.logout((err)=>{
      if(err){
         next(err)
      }
      else{
          req.flash('success','Logout Successfully!!!')
         
  
          res.redirect('/campgrounds')
      }
    })
    }