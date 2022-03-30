const mongoose=require('mongoose');
const UserModel= mongoose.Schema;


const Data= new UserModel({
username:{
type:String,
required:true
},
email:{
type:String,
required:true
},
phone:{
    type:Number,
    required:true
},
password:{
    type:String,
    required:true
},
isAdmin: {
    type: String,
    default: "user"
},
status: {
    type: Boolean,
    default: true
}
})
const UserData= mongoose.model("project_data",Data)
module.exports=UserData;
