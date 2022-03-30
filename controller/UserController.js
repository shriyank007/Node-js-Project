const UserModel=require('../model/UserModel')
const PostData = require('../model/PostModel')
const AboutModel = require('../model/AboutModel')
const CommentModel = require('../model/Comment')

exports.home=(req,res) =>{
const pager = req.query.page ? req.query.page : 1
    const options = {
        page: pager,
        limit: 2,
        collation: {
        locale: 'en',
        },
      };
      PostData.paginate({}, options).then(function (data) {
            if(data){
                //console.log(data)
                res.render('home',{
                    data:req.user,
                    displayData:data,
                    pager: pager
                })
            }    
        }).catch(err=>{
            console.log(err);
        })
}

exports.about=(req,res) =>{
AboutModel.find({}, (err,details)=>{
if(!err){
res.render('about',{
data:req.user,
displayData:details
})
}  
else{
console.log(err)
}
})
}

exports.contact=(req,res) =>{
res.render('contact',{
data:req.user
})
}

exports.index_login=(req,res)=>{
loginData={}
loginData.email=(req.cookies.email) ? req.cookies.email : undefined
loginData.password=(req.cookies.password) ? req.cookies.password : undefined
res.render('login',{
message: req.flash("message"),
data:loginData
})
}

exports.register_page=(req,res)=>{
res.render('register',{
message: req.flash("message")
})
}

exports.userAuth=(req,res,next)=>{
if(req.user){
console.log(req.user)
next()
}
else{
console.log(req.user)
res.redirect('/index_login')
}
}

exports.dashboard=(req,res)=>{
if(req.user){
UserModel.find({}, (err,details)=>{
if(!err){
res.render('dashboard',{
data:req.user,
userDetails: details
})
}
else {
console.log(err);
}
})
}
}


exports.post=(req,res)=>{
    res.render('create_post',{
    data:req.user
    })
}
 
exports.post_data=(req,res)=>{
    const image = req.file
    const title = req.body.title.trim()
    const slug = title.replace(/\s+/g, '-').toLowerCase()
    const NewData= new PostData({
    title:req.body.title,
    subtitle:req.body.subtitle,
    post:req.body.editor1,
    image:image.path,
    slug: slug
})
NewData.save().then((result)=>{
    console.log(result,"Post Added Successfully!")
    res.redirect("/")
}).catch((err)=>{
console.log(err)
})
}

exports.readpost=(req,res)=>{
        PostData.findOne({slug: req.params.slug},(err,result)=>{
            if(!err){
                console.log(result)
                 res.render('readpost',{
                    data:req.user,
                    displayData:result
                 })
                
            }      
        })
   
}
// exports.newComment=(req,res)=>{
//     CommentModel({
//     comments:req.body.comments
//     }).save().then(()=>{
//     console.log("Comment Added Successfully!");
//     res.redirect("/")
//     }).catch((err)=>{
//     console.log(err)
//     })
// }

exports.logout = (req, res) => {
    res.clearCookie("UserToken");
    res.redirect("/");
}
