const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const NewSchema = new Schema({
    comments:{
    type:String,
    required:true
    }
})

const AboutModel = mongoose.model("comment",NewSchema);
module.exports = AboutModel;