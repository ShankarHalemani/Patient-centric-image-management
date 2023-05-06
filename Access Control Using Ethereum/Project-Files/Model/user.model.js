const mongoose = require("mongoose");
const { Schema , model } = mongoose;



const userSchema = new Schema({
    username:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required: true,
    },
    password:{
        type:String,
        required: true,
    },
    address:{
        type:String,
        required: true
    },
    hashes:{
        type:[mongoose.Types.ObjectId],
        ref:"Hash"
    },
    requests:{
        type:[mongoose.Schema.ObjectId],
        ref:"Request"
    },
    access:{
        type:[mongoose.Types.ObjectId],
        ref:"HashAccepted"
    }
});


const User = model("User",userSchema);
module.exports = User;