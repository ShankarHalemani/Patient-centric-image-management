const mongoose = require("mongoose");
const { Schema , model } = mongoose;


const requestSchema = new Schema({
    hash:{
        type:String,
        required: true,
    },
    reason:{
        type:String,
        required:true,
    },
    requestUser:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required: true
    }
});


const Request = model("Request",requestSchema);
module.exports = Request;