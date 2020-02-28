express = require("express"),
layouts = require("express-ejs-layouts"),
homeController=require("./controllers/homeController"),
errorController = require("./controllers/errorController"),
usersController = require("./controllers/usersController"),
MongoDB = require("mongodb").MongoClient,
Subscriber=require("./models/subscriber"),
Course = require("./models/course"),
User = require("./models/user"),
router=express.Router(),
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
var testCourse,testSubscriber,testUser;
db.once("open",()=>{
    console.log("Successfully conneted to mongodb server.");
    // User.create({
    //     name:{
    //         first:"John",
    //         last_name:"Cena"
    //     },
    //     email:"john@gmail.com",
    //     password:"pass@12"
    // }).then(result=>console.log(result)).catch(err=>console.log(err.message))
    // User.findOne({}).then(user=>{
    //     testUser = user;
    //     return Subscriber.findOne({email:testUser.email});
    // }).then(subscriber1=>{ testUser.subscribedAccount = subscriber1;
    // testUser.save().then(user=>console.log(user)) }).catch(err=>console.log(err));
//    User.findOne({email:"john@gmail.com"}).then(user=>console.log(user.fullName)).catch(err=>console.log(err));
});
app.set("port",3000);
app.set("view engine","ejs");
app.use(layouts),
app.use(express.urlencoded({
    extended:false
}));

app.use(express.json());
app.use("/",router);
app.use(express.static('public'));

app.get("/",homeController.homePage);

app.get("/courses.html",homeController.showCourses);
app.get("/contact.html",homeController.showSignup);
app.get("/subscribers",subscribersController.getAllSubscriber,(req,res,next)=>{ res.render("subscriber",{subscribers:req.data}); });
app.post("/",homeController.postSignup);
app.post("/subscribe",subscribersController.saveSubscriber);
app.get("/users",usersController.index, usersController.indexView);
app.get("/users/create",usersController.newUser);
app.use(errorController.logErrors);
app.use(errorController.notFound);
app.listen(app.get("port"),()=>{
    console.log(`App running on port ${app.get("port")}`)
});