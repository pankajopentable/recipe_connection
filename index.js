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
methodOverride = require("method-override"),
app = express();
const mongoose = require("mongoose");
const subscribersController = require("./controllers/subscribersController");

const dbUrl = "mongodb+srv://recipe_pankaj:c3lcq3kXRMK50EPp@cluster0-tdqek.mongodb.net/recipe_db?retryWrites=true&w=majority";
const dbName = 'recipe_db';

mongoose.connect(dbUrl,{useNewUrlParser:true,useUnifiedTopology:true});
mongoose.set("useCreateIndex",true);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.once("open",()=>{
    console.log("Successfully conneted to mongodb server.");
});

app.set("port",3000);
app.set("view engine","ejs");
router.use(layouts),
router.use(express.urlencoded({
    extended:false
}));
router.use(methodOverride("_method",{
    methods:["POST","GET"]
}));
router.use(express.json());
router.use(express.static('public'));

router.get("/",homeController.homePage);
router.get("/courses.html",homeController.showCourses);
router.get("/contact.html",homeController.showSignup);
router.get("/subscribers",subscribersController.getAllSubscriber,(req,res,next)=>{ res.render("subscriber",{subscribers:req.data}); });
router.post("/",homeController.postSignup);
router.post("/subscribe",subscribersController.saveSubscriber);
router.get("/users",usersController.index, usersController.indexView);
router.get("/users/create",usersController.newUser);
router.get("/users/:user_id/edit",usersController.editUser);
router.put("/users/:user_id/update",usersController.update,usersController.redirectView);
router.post("/users/create",usersController.create, usersController.redirectView);
router.delete("/users/delete/:id",usersController.deleteUser, usersController.redirectView);
router.use(errorController.logErrors);
router.use(errorController.respondNoResourceFound);
router.use(errorController.respondInternalError);

app.use("/",router);
app.listen(app.get("port"),()=>{
    console.log(`App running on port ${app.get("port")}`)
});
// module.exports = router;
