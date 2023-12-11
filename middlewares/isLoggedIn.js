const jwt = require("jsonwebtoken");

const isLoggedIn = async(req,res , next)=>{
    const token = req.cookies.jwt;
    if(token){
        next();
    }
    else return res.redirect("/login");
}

module.exports = isLoggedIn;