const express=require('express')
const app=express()
const ejs=require('ejs')
const path=require('path')
const multer=require('multer')
const mongoose=require('mongoose')
const cookieParser=require('cookie-parser')
const flash=require('connect-flash')
const jwtAuth=require('./middleware/JwtVerify')
const AdminAuth=require('./middleware/adminJwt')
const session=require('express-session')


app.use(session({
    cookie: { maxAge: 60000 },
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}))
app.use(cookieParser())
app.use(flash())
app.set("view engine", "ejs")
app.set("views","views")
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, 'public')))
app.use('/upload',express.static(path.join(__dirname,'upload')))

const fileStorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'upload')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})

const filterFile=(req,file,cb)=>{
    if(file.mimetype.includes("png") ||
    file.mimetype.includes("jpg") ||
    file.mimetype.includes("pdf") ||
    file.mimetype.includes("jpeg")){
        cb(null,true)
    } else{
        cb(null,false)
    }
}

app.use(multer({storage:fileStorage,fileFilter:filterFile,limits:{fieldSize:1024*1024*5}}).single('image'))




const UserRoute=require('./route/UserRoute')
const AuthRoute=require('./route/AuthRoute')
const AdminRoute=require('./route/adminRoute')

app.use(jwtAuth.JwtVerify)
app.use(AdminAuth.jwtAdminAuth)
app.use(UserRoute)
app.use(AuthRoute)
app.use('/admin',AdminRoute)

const dbDriver = "mongodb+srv://shriyaBlog:1i90a30i4gk3f8Zn@cluster0.hzimr.mongodb.net/Project1";

const port = process.env.PORT || 4000
mongoose.connect(dbDriver,{useNewUrlParser:true,useUnifiedTopology:true}).then((result) => {
    app.listen(port, function(){
    console.log(`Server Running on http://localhost:${port}`)
    console.log("Database Connection Established!")
    })
}).catch((err) => {
console.log("Error: ", err)
})