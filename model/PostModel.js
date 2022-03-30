const mongoose=require('mongoose');
const PostModel = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate-v2');

const Data= new PostModel({
title:{
type:String,
required:true
},
subtitle:{
type:String,
required:true
},
post:{
type:String,
required:true
},
image:{
type:String,
required:true
},
status: {
type: Number,
default:1
},
slug:{
    type:String,
    unique: true,
    required:true
},
})
Data.plugin(mongoosePaginate);
const PostData= mongoose.model("PostData",Data)
module.exports = PostData