const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const userController = () => {
    return {
        userRegistration: async (req, res) => {
                const { name, email, password} = req.body;

                const user = await User.findOne({ email: email });
                if (user) {
                    return res.redirect("/register");
                }
                else {
                    if (name && email && password ) {
                        //  all data fields is provided by user
    
                            const salt = await bcrypt.genSalt(10);
                            const hashPassword = await bcrypt.hash(password, salt);
    
                            const newUser = new User({
                                name: name,
                                email: email,
                                password: hashPassword,
                            })
                            await newUser.save();
    
                            const savedUser = await User.findOne({email:email});
    
                            //  generating the JWT token
                            // yaha jwt token me hum user ki id store kar rhe h
                            const token = jwt.sign({userId: savedUser._id} , process.env.JWT_SECRET_KEY , {expiresIn : '15m'} );
    
                            //  storing jwt token inside cookie
                            res.cookie("jwt" , token);
     
                            return res.redirect("/");
                    }
                    else {  
                       return res.redirect("/register");
                    }
    
                }
           
        },

        userLogin: async (req, res) => {
            const { email, password } = req.body;

            if (email && password) {
                const user = await User.findOne({ email: email });
                if (user) {

                    // matching the user's credentials
                    const isMatch = bcrypt.compare(user.password, password);
                    if (user.email === email && isMatch) {

                         // generating JWT token
                         const token = jwt.sign({userId: user._id} , process.env.JWT_SECRET_KEY , {expiresIn : '15m'} );


                            //  storing jwt token inside cookie
                            res.cookie("jwt" , token);
                         return res.redirect("/");

                    }
                    else return res.status(400).json({ "status": "failed", "message": "email or password is wrong"});
                }
                else return res.status(400).json({ "status": "failed", "message": "user not found" });
            }
            else return res.status(400).json({ "status": "failed", "message": "all fields are required" });
        },


    }
}

module.exports = userController;