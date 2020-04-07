"use strict";
const { check, body, validationResult } = require('express-validator');
const User = require("../models/user"),
passportLocalMongoose = require("passport-local-mongoose"),
  getUserParams = body => {
    return {
      name: {
        first: body.first,
        last_name: body.last
      },
      email: body.email,
      password: body.password,
      zipCode: body.zipCode
    };
  };

module.exports = {
  index: (req, res, next) => {
    User.find()
      .then(users => {
        res.locals.users = users;
        next();
      })
      .catch(error => {
        console.log(`Error fetching users: ${error.message}`);
        next(error);
      });
  },
  indexView: (req, res) => {
    res.render("users/index");
  },

  newUser: (req, res) => {
      
    res.render("users/new");
  },

  create: (req, res, next) => {
       if (req.skip) next();
    let userParams = getUserParams(req.body);

    User.create(userParams)
      .then(user => {
        req.flash("success","Account created.");
        res.locals.redirect = "/users";
        res.locals.user = user;
        next();
      })
      .catch(error => {
        console.log(`Error saving user: ${error.message}`);
        next(error);
      });
  },

  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath !== undefined) res.redirect(redirectPath);
    else next();
  },

  show: (req, res, next) => {
    let userId = req.params.id;
    User.findById(userId)
      .then(user => {
        res.locals.user = user;
        next();
      })
      .catch(error => {
        console.log(`Error fetching user by ID: ${error.message}`);
        next(error);
      });
  },

  showView: (req, res) => {
    res.render("users/show");
  },

  edit: (req, res, next) => {
    let userId = req.params.id;
    User.findById(userId)
      .then(user => {
        res.render("users/edit", {
          user: user
        });
      })
      .catch(error => {
        console.log(`Error fetching user by ID: ${error.message}`);
        next(error);
      });
  },

  update: (req, res, next) => {
    let userId = req.params.id,
      userParams = getUserParams(req.body);
    //    res.json(userParams); 
    User.findByIdAndUpdate(userId, {
      $set: userParams
    },{runValidators:true,useFindAndModify:false})
      .then(user => {
        res.locals.redirect = `/users/${userId}`;
        res.locals.user = user;
        next();
      })
      .catch(error => {
          res.json(error);
        console.log(`Error updating user by ID: ${error.message}`);
        next(error);
      });
  },

  delete: (req, res, next) => {
    let userId = req.params.id;
    User.findByIdAndRemove(userId)
      .then(() => {
        res.locals.redirect = "/users";
        next();
      })
      .catch(error => {
        console.log(`Error deleting user by ID: ${error.message}`);
        next();
      });
  },
  loginView:(req,res)=>{
      res.render("users/login");
  },
  authenticate:(req,res,next)=>{
      let email = req.body.email;
      User.findOne({email:email}).then(user=>{
          user.passwordComparison(req.body.password).then(passwordMatch=>{
              console.log(passwordMatch);
              if( passwordMatch ) {
                    req.flash("success","Successfully login");
                    res.locals.redirect = "/users/"+user._id;
                } else{
                    req.flash("error","password does not match.");
                res.locals.redirect = "/login";
                }
                next();
          })
          
      }).catch(err=>{
          req.flash("error","Email not found");
          res.locals.redirect = "/login";
          next();
      })
  },
  validate:(req,res,next)=>{
    //   body("email").isEmail().normalizeEmail({
    //       all_lowercase:true
    //   }).trim();
    body("email","Please enter valid email").isEmail().isEmpty();
    const err = validationResult(req);   
    res.json(err.array());
    // const errors = validationResult(req);   
    // res.json(errors.array());
    // if (!errors.isEmpty()) {
    //     let messages = errors.array().map(e=>e.msg);
    //     req.skip = true;
    //     req.flash("error",messages.join(" and "));
    //     res.locals.redirect = "/users/new"
    //     next();
    // }   else {
    //     next();
    // }
  }
};
