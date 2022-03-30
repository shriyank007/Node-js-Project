const AdminModel=require('../model/UserModel')
const AboutModel=require('../model/AboutModel')
const PostModel=require('../model/PostModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.login=(req,res) => {
    res.render('Admin/adminlogin',{
    message:req.flash('message')
    })
}

exports.signin=(req,res)=>{
    AdminModel.findOne({
    email:req.body.email
    },(err,data)=>{
    if(data){
    if(data.status){
    if(data.isAdmin=="admin"){
        const hashPassword = data.password;
        if(bcrypt.compareSync(req.body.password , hashPassword)){
               const token = jwt.sign({
                     id: data._id,
                    username: data.username,
                    email: data.email}, 
            "shriyaadmin-160494@#1!1926", { expiresIn: '20m' })
            res.cookie("adminToken", token);    
            res.redirect("adminDashbord")
        }
        else {
            req.flash('message',"Password Not Match!")
               console.log("Password Not Match!");
               res.redirect('/admin/admin')
        }
    } else{
        req.flash('message',"You are not Admin!")

        console.log("You are not Admin!");
        res.redirect('/admin/admin')
    }
    }
    else {
        req.flash('massage',"Email Not Exist!")

        console.log('Email Not Exist!');
        res.redirect('/admin/admin')
    }
    }
})
}

exports.adminAuth = (req, res, next) => {
    if (req.admin) {
        console.log(req.admin);
        next();
    } else {
        console.log('Error while Admin Auth');
        res.redirect('/admin/admin')
    }
}
exports.adminDeshbord = (req, res) => {
    res.render('Admin/admindash', {
        adminData: req.admin
    })
}
exports.about = (req, res) => {
AboutModel.find({}, (err,details)=>{
if(!err){
res.render('Admin/about',{
displayData: details
})
}
else{
console.log(err)
}
})
}

exports.addAbout= (req, res) => {
    res.render('Admin/add_about')
}

exports.addPost= (req, res) => {
const image = req.file
AboutModel({
aboutitle: req.body.aboutitle,
aboutbody: req.body.editor1,
image:image.path
}).save().then((result) => {
console.log(result)
res.redirect('/admin/add_about')
}).catch((err) => {
console.log(err)
})
}

exports.edit=(req,res)=>{
    const pid=req.params.p_id
    AboutModel.findById(pid).then((result)=>{
    // console.log(result)
    res.render('Admin/edit_about',{
    data:result
    })
}).catch((err)=>{
    console.log(err)
})
}

exports.userdata=(req, res)=>{
AdminModel.find({}, (err,details)=>{
if(!err){
res.render('Admin/userdata',{
userDetails:details
})
}
})
}
exports.delete=(req, res) => {
    const id = req.params.p_id
    AboutModel.deleteOne({_id:id}).then((result) => {
    console.log("Delete Successfully!",result)
    res.redirect('/admin/adminDashbord')
    }).catch((err) => {
    console.log("Error",err)
    })
}

exports.userpost=(req, res)=>{
PostModel.find({}, (err,details)=>{
if(!err) {
res.render('Admin/userpost',{
displayData: details
})
}
else{
console.log(err)
}
})
}

exports.deletepost=(req, res)=>{
PostModel.findByIdAndUpdate(req.params.pid, { status: 0 }, (error, data) => {
    if (!error) {
        console.log("Successful!");
        res.redirect('/admin/userpost');
    } else {
        console.log(error);
    }
})
}

exports.logout = (req, res) => {
    res.clearCookie("adminToken")
    res.redirect('/admin/admin')
}


