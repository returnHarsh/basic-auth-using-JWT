const jwt = require("jsonwebtoken");
const User = require("../models/user")

const auth = async(req,res,next)=>{
    const token = req.cookies.jwt;
    if(token){
        const decodedObj = jwt.decode(token , process.env.JWT_SECRET_KEY);
        const id = decodedObj.userId;
        const user = await User.findById(id);
        if(user){
            res.locals.user = user.name;
            next();
        }
        else {
            res.locals.user = "guest";
            next();
        }
    }
    else {
        res.locals.user = "guest";
        next();
    }
}

module.exports = auth;