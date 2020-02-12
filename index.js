express = require("express"),
layouts = require("express-ejs-layouts"),
homeController=require("./controllers/homeController"),
errorController = require("./controllers/errorController"),
MongoDB = require("mongodb").MongoClient,
app = express();
// const Subscriber = require("./models/subscriber") ;
const mongoose = require("mongoose");
const subscribersController = require("./controllers/subscribersController");
// var subscriber = new Subscriber({name:"jon snow",email:"jon@got.com"});
// subscriber.save((error,saveDocument)=>{
//     if(error) console.log(error);
//     console.log(saveDocument);
// });
// var myQuery = Subscriber.findOne({name:"Brendon"}).where("email",/brandon/);
// myQuery.exec((error,data)=>{
//     if(data) {
//         console.log(data);
//     }
// })
const dbUrl = "mongodb+srv://recipe_pankaj:c3lcq3kXRMK50EPp@cluster0-tdqek.mongodb.net/recipe_db?retryWrites=true&w=majority";
const dbName = 'recipe_db';
mongoose.connect(dbUrl,{useNewUrlParser:true,useUnifiedTopology:true});
mongoose.Promise = global.Promise;

let db = mongoose.connection;
db.once("open",()=>{
    console.log("Successfully conneted to mongodb server.")
});
app.set("port",3000);
app.set("view engine","ejs");
app.use(layouts),
app.use(express.urlencoded({
    extended:false
}));

app.use(express.json());
app.use(express.static('public'));
app.get("/",homeController.homePage);

app.get("/courses.html",homeController.showCourses);
app.get("/contact.html",homeController.showSignup);
app.get("/subscribers",subscribersController.getAllSubscriber,(req,res,next)=>{ res.render("subscriber",{subscribers:req.data}); });
app.post("/",homeController.postSignup);
app.post("/subscribe",subscribersController.saveSubscriber);

app.use(errorController.logErrors);
app.use(errorController.notFound);
app.listen(app.get("port"),()=>{
    console.log(`App running on port ${app.get("port")}`)
});