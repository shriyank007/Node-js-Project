const UserModel = require('../model/UserModel')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.register=(req,res) => {
UserModel({
username: req.body.username,
email: req.body.email,
phone: req.body.phone,
password: bcryptjs.hashSync(req.body.password ,bcryptjs.genSaltSync(10))
}).save((err,data) => {
if(!err){
req.flash('message',"User Added Successfully!")
res.redirect("/index_login")
}
else {
console.log(err)
}
})
}

exports.login=(req, res)=>{
UserModel.findOne({
email: req.body.email,
},(err,data)=>{
if(data){
const hashPassword = data.password
if(bcryptjs.compareSync(req.body.password ,hashPassword)){
const token = jwt.sign({
id:data._id,
username:data.username
}, "shriya-1994164@#1!1234" ,{expiresIn:'20m'})
res.cookie("UserToken",token)
if(req.body.rememberme){
    res.cookie('email', req.body.email)
    res.cookie('password', req.body.password)
}
res.redirect('/dashboard')
}
else{
req.flash("message","Invalid Password!")
res.redirect("/index_login")
}
}
else{
req.flash("message","Invalid Email!")
res.redirect("/index_login")
}
})
}