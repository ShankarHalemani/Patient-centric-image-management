const express = require("express");
const User    = require("../Model/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.route("/create/account")
    .get((req,res)=>{
        res.render("create_account");
    })
    .post(async(req,res)=>{
        const { username , email , password, address } = req.body;
    
        // check if usere exists
        try{
            const user = await User.findOne({email});
            if(user)
            {
                console.log("User already exists");
                res.redirect("/user/create/account");
            }else{
                // create a new User
                const newUser = new User;
                newUser.username = username;
                newUser.email = email;
                newUser.address = address;
                let hashedPassword = await bcrypt.hash(password,8);
                newUser.password = hashedPassword;
                await newUser.save();
    
                console.log(newUser);
                
                let payload = {
                    username,
                    email
                };
    
                let token = jwt.sign(payload,process.env.SECRET,{
                    expiresIn:"1d"
                });
    
                res.cookie("auth",token,{
                    maxAge:24 * 60 * 60 * 1000,
                    httpOnly: true
                })
    
                console.log(token);
    
                res.redirect("/");
    
            }
        }
        catch(error)
        {
            console.log(error);
            res.redirect("/user/create/account");
        }
    
    });



router.route("/login/")
    .get((req,res)=>{
        res.render("login");
    })
    .post(async(req,res)=>{
        const { email , password } = req.body;
        try{
            const user = await User.findOne({email});
            if(!user)
            {
                console.log("No User exists with the given email!");
                res.redirect("/user/create/account");
            }else{
                const truthy = await bcrypt.compare(password,user.password);
                console.log(truthy);

                if(truthy)
                {
                    // sign a jwt token and set cookie
                    const payload = {
                        username: user.username,
                        email
                    };

                    let token = jwt.sign(payload,process.env.SECRET,{
                        expiresIn: "1d",
                    });

                    res.cookie("auth",token,{
                        maxAge:1 * 1000 * 60 * 24,
                        httpOnly: true
                    });

                    res.redirect("/");
                }else{
                    console.log("Password is incorrect");
                    res.redirect("/user/login");
                }

            }
        }
        catch(error)
        {
            console.log("Something went wrong");
            console.log(error);
            res.redirect("/user/login");
        }

    })


router.route("/logout/")
    .post((req,res)=>{
        try{
            const { auth } = req.cookies;
            res.cookie("auth","",{
                maxAge: 1,
                httpOnly: true,
            });

            res.redirect("/user/login");
        }
        catch(err)
        {
            console.log("Something went wrong!");
            console.log(err);
        }
    })

module.exports = router;