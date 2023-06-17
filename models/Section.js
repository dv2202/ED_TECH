const mongoose = require('mongoose');
const sectioSchema = new mongoose.Schema({
    sectionName:{
        type:String,
    },
    subSection:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"SubSection",
        required:true,
    }]
});
module.exports = mongoose.model('sectioSchema', sectioSchema);