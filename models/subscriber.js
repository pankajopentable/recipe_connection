const mongoose = require("mongoose");
const subscriberSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    zipCode:{
        type:Number,
        min:[10000,"Zipcode to short"],
        max:99999
    },
    courses:[{type:mongoose.Schema.Types.ObjectId,ref:"Course"}]
},{
    timestamps:true
});
subscriberSchema.methods.getInfo = function(){
    return `Name ${this.name}, Email:${this.email}, zipcode: ${this.zipcode}`;
}

subscriberSchema.methods.findLocalSubscribers = function(){
    return this.model('Subscriber').find({zipcode:this.zipcode}).exec();
}
module.exports = mongoose.model("Subscriber",subscriberSchema);