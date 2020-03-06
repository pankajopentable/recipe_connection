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
        User.create(userSchema).then(user=>{
            res.locals.redirect = "/users";
            next()
        }).catch(error=>{
            console.log(`Error occured ${error.message}`);
            next(error);
        })
    },
    redirectView:(req,res,next)=>{
        let redirectPath = res.locals.redirect;
        if(redirectPath) {
            res.redirect(redirectPath);
        } else
            next();
    },

    editUser:(req,res,next) =>{
        // res.locals.user_id = req.params.user_id;
        User.findOne({_id:req.params.user_id}).then(user=>{
            res.locals.user = user;
            res.render("users/edit");
        }).catch(err=>{
            console.log(`Error occured ${err}`);
            next(err);
        })
        
    },

    update:(req, res,next) =>{
        let userSchema = {
            name:{
                first:req.body.first,
                last_name:req.body.last
            },
            email:req.body.email,
            password:req.body.password,
            zipCode:req.body.zipCode
        }
        User.findByIdAndUpdate(req.params.user_id,{
            $set:userSchema
        }).then(user=>{
            res.locals.user = user;
            res.locals.redirect= "/users";
            next()
        }).catch(error=>{
            console.log(`error occured : ${error}`);
            next(error);
        })
        //  res.send(req.params.user_id)
    },
    deleteUser:(req,res,next)=>{
        let userId = req.params.id;
        User.findByIdAndRemove(userId).then(()=>{
            res.locals.redirect = "/users";
            next();
        }).catch(err=>{
            console.log(err);
            next(err);
        })

    }
}