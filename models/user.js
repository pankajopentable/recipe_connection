const mongoose = require("mongoose"),
{Schema} = mongoose,
passportLocalMongoose = require('passport-local-mongoose'),
Subscriber = require("./subscriber"),
bcrypt=require("bcrypt");
userSchema = new Schema({
    name:{
        first:{
            type:String,
            trim:true,
            required:true
        },
        last_name:{
            type:String,
            trim:true,
            required:true
        }
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    zipCode:{
        type:Number,
        min:[10000,'Zipcode too short'],
        max:99999
    },
    courses:[{type:Schema.Types.ObjectId, ref:"Course"}],
    subscribedAccount:{type:Schema.Types.ObjectId, ref:"Subscriber"}
},{ timestamps:true});
userSchema.virtual("fullName").get(function(){
    return `${this.name.first} ${this.name.last_name}`;
});

userSchema.pre("save",function(next){
    console.log('lodfpp');
    let user = this;
    if(user.subscribedAccount === undefined) {
        Subscriber.findOne({email:user.email}).then(subs=>{
            user.subscribedAccount = subs;
            next();
        }).catch(err=>{
            console.log(`Error occured ${err}`);
            next(err);
        })
    } else {
        next();
    }
});
// userSchema.pre("save",function(next){
//     console.log('jdfkkl');
   
//   let user2 = this;
//   console.log(user2.password);
//   bcrypt.hash(user2.password, 10)
//     .then(hash => {
//       user2.password = hash;
//       console.log(user2.password)
//       next();
//     })
//     .catch(error => {
//       console.log(`Error in hashing password: ${error.message}`);
//       next(error);
//     });
// });
userSchema.methods.passwordComparison =  function(inputPassword){
    let user = this;
    console.log(user.password+' UserPassword--: '+inputPassword);

    return bcrypt.compare(inputPassword, user.password);
}
userSchema.plugin(passportLocalMongoose, {
    usernameField:"email"
});
module.exports = mongoose.model("User",userSchema);
