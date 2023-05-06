const mongoose = require("mongoose");
const { Schema , model } = mongoose;


const hashAccepted = new Schema({
    hash:{
        type:String,
        required: true,
    },
    description:{
        type:String,
        required: true,
    },
    owner:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required: true
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required: true
    }
});


const HashAccepted = model("HashAccepted",hashAccepted);
module.exports = HashAccepted;