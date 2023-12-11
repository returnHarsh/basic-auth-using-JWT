const userController2 = ()=>{

    return{
        home : async(req,res)=>{
            return res.render("home");
        },

        smoothies : async(req,res)=>{
            return res.render("smoothies");
        },
        
        getLogin : async(req,res)=>{
            return res.render("login")
        },

        getRegister : async(req,res)=>{
            return res.render("register");
        },

        logout : function(req,res){
            const token = req.cookies.jwt;
            if(token){
                res.clearCookie("jwt");
                return res.redirect("/");
            }
            else return res.redirect("/");
        },

    }

}

module.exports = userController2;