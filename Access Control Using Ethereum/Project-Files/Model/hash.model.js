const { default: mongoose } = require("mongoose");
const mogngoose = require("mongoose");
const { Schema ,model } = mongoose;


const hashSchema = new Schema({
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
    }
});


const Hash = model("Hash",hashSchema);
module.exports = Hash;