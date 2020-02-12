const subscribers = require("../models/subscriber");
exports.getAllSubscriber = (req,res,next)=> {
    subscribers.find({},(error,data)=>{
        if(data) {
            req.data = data;
            next();
        }
        next(error);
    })
}
exports.saveSubscriber = (req,res) =>{
    let subscriber = new subscribers({
        name:req.body.name,
        email:req.body.email,
        zipCode:req.body.zipcode
    });
    subscriber.save((error,data)=>{
        if(data) {
            res.render('thanks');
        }
    })
}