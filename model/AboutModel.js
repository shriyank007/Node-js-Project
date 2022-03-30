const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const NewSchema = new Schema({
aboutitle: {
type:String,
required: true
},
aboutbody: {
type:String,
required: true
},
image: {
type:String,
required: true
}
})

const AboutModel = mongoose.model("aboutdata",NewSchema);
module.exports = AboutModel;