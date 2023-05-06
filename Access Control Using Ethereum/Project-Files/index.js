require("dotenv").config();


require("./Model/");                             // database conection
const path           = require("path");
const express        = require("express");
const ejsMate        = require("ejs-mate");
const cookieParser   = require("cookie-parser");
const methodOverride = require("method-override");
const fileUpload     = require("express-fileupload");
const isLoggedIn     = require("./middlewares/isLoggedIn");

// app instance
const app     = express();

// initialize body object
app.use(express.json());
app.use(express.urlencoded({extended: true}));  // initialize req.body object
// app.use(fileUpload()); // initialize req.files object

// initialize template engine 
app.engine("ejs",ejsMate);
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.set("views",path.join(__dirname,"view"));


// to use DELETE / PUT
app.use(methodOverride("_method"));

app.use(cookieParser());


// Here goes all the routes

app.use((req,res,next)=>{
    res.locals.auth = req.cookies.auth;
    next();
})

const authRoutes = require("./Routes/auth");
const actionRoutes = require("./Routes/action");


app.get("/",isLoggedIn,async(req,res)=>{
    res.render("home");
})


app.use("/user/",authRoutes);
app.use("/action/",actionRoutes);

const PORT = process.env.PORT || 8081;

app.listen(PORT,()=>{
    console.log(`Listening to the PORT ${PORT}`);
});