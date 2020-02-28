const User = require("../models/user");
module.exports = {
    index:(req,res,next)=>{
        User.find().then(users=>{
             res.locals.users = users;
            next();
        }).catch(error=>{
            console.log(`Erro occured ${error.message}`);
            res.redirect("/");
            next(error)
        })
    },
    indexView:(req,res)=>{
         res.render("users/index");
    },
    newUser:(req,res) => {
        res.render("users/new");
    },
    create:(req,res,next)=>{
        let userSchema = {
            name:{
                first:req.body.first,
                last_name:req.body.last,
            },
            email:req.body.email,
            password:req.body.password,
            zipCode:req.body.zipCode
        };
        user.create(userSchema).then(user=>{
            res.locals.redirect = "/users";
            next()
        }).catch(error=>{
            console.log(`Error occured ${error.message}`);
            next(error);
        })
    },
    redirectView:(req,res,next)=>{
        let redirectPath = res.redirect;
        if(redirectPath) {
            res.redirect(redirectPath);
        } else
            next();
    }
}