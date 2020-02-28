const mongoose = require("mongoose"),
{Schema} = mongoose,
userSchema = new Schema({
    name:{
        first:{
            type:String,
            trim:true
        },
        last_name:{
            type:String,
            trim:true
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
module.exports = mongoose.model("User",userSchema);
