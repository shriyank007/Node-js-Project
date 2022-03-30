const jwt=require('jsonwebtoken')

exports.JwtVerify=(req,res,next)=>{
if(req.cookies && req.cookies.UserToken){
jwt.verify(req.cookies.UserToken, "shriya-1994164@#1!1234", (err,data)=>{
req.user=data
next();
})
}
else{
next()
}
}