const jwt = require("jsonwebtoken");
const User = require("../Model/user.model");


const isLoggedIn = (req,res,next)=>{
    const { auth } = req.cookies;
    if(!auth)
    {
        console.log("");
        res.redirect("/user/login")
    }else{
        next();
    }
}

module.exports = isLoggedIn;

// TaFEHQq0GpgPQzvD