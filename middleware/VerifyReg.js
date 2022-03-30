const UserModel = require('../model/UserModel')

exports.CheckDuplicateUser=(req,res,next) => {
UserModel.findOne({
username: req.body.username
}).exec((err,user) => {
if (err) {
console.log(err)
return
}
if(user){
req.flash('message',"User Name Already Exists!")
return res.redirect('/register')
}
UserModel.findOne({
email: req.body.email
}).exec((err,email) => {
if(err) {
console.log(err)
return
}
if(email){
req.flash('message',"User Email Already Exists!")
return res.redirect('/register')
}
UserModel.findOne({
phone: req.body.phone
}).exec((err,phone) => {
if(err) {
console.log(err)
return
}
if(phone){
req.flash('message',"Phone Number Already Exists!")
return res.redirect('/register')
}
const password= req.body.password
const confirmpassword= req.body.confirmpassword
if(password !== confirmpassword ){
req.flash("message","Password & Confirm Password Are Not Matched")
return res.redirect('/register')
}
next()
})
})
})
}