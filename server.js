const express = require('express');
const app = express();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const connectDB = require("./config/connectDB");
const userRoutes = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");
const auth = require("./middlewares/auth");

//  JSON
app.use(express.json());

//  for form data
app.use(express.urlencoded({extended: false}));

//  to access public folder
app.use(express.static('public'));
// CORS
app.use(cors());

app.use(cookieParser());

app.use('*' , auth);


const PORT = process.env.PORT || 8000;
connectDB();

// view engine
app.set("view engine" , "ejs");

app.use(userRoutes);

app.listen(PORT , ()=>{
    console.log("server online");
})