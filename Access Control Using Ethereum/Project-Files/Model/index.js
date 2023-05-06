const mongoose = require("mongoose");

let URL = process.env.db_url;

mongoose.connect(URL)
    .then((data)=>{
        console.log("connected to database");
    })
    .catch((err=>{
        console.log("Error");
        console.log(err);
    }))