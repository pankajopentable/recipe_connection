express = require("express"),
layouts = require("express-ejs-layouts"),
homeController=require("./controllers/homeController"),
coursesController=require("./controllers/coursesController"),
subscribersController = require("./controllers/subscribersController"),
errorController = require("./controllers/errorController"),
usersController = require("./controllers/usersController"),
MongoDB = require("mongodb").MongoClient,
Subscriber=require("./models/subscriber"),
Course = require("./models/course"),
User = require("./models/user"),
router=express.Router(),
methodOverride = require("method-override"),
app = express(),
expressSession = require("express-session"),
cookieParser = require("cookie-parser"),
connectFlash = require("connect-flash"),
passport=require("passport"),
User = require("./models/user");

const mongoose = require("mongoose");

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
// router.use(expressValidator());
router.use(express.static('public'));
router.use(cookieParser("secret_key"));
router.use(expressSession({
    secret:"secret_key",
    cookie:{
        maxAge:4000000
    },
    resave:false,
    saveUninitialized:false
}));
router.use(passport.initialize());
router.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.use(connectFlash());

router.use((req,res,next)=>{
    res.locals.flashMessages = req.flash();
    next();
});
router.get("/", homeController.index);
router.get("/login",usersController.loginView);
router.post("/login",usersController.authenticate,usersController.redirectView);
router.get("/users", usersController.index, usersController.indexView);
router.get("/users/new", usersController.newUser);
router.post("/users/create", usersController.validate,usersController.create, usersController.redirectView);
router.get("/users/:id/edit", usersController.edit);
router.put("/users/:id/update", usersController.update, usersController.redirectView);
router.get("/users/:id", usersController.show, usersController.showView);
// router.delete("/users/:id/delete", usersController.delete, usersController.redirectView);

router.get("/subscribers", subscribersController.index, subscribersController.indexView);
// router.get("/subscribers/new", subscribersController.new);
router.post(
  "/subscribers/create",
  subscribersController.create,
  subscribersController.redirectView
);
router.get("/subscribers/:id/edit", subscribersController.edit);
router.put(
  "/subscribers/:id/update",
  subscribersController.update,
  subscribersController.redirectView
);
router.get("/subscribers/:id", subscribersController.show, subscribersController.showView);
// router.delete(
//   "/subscribers/:id/delete",
//   subscribersController.delete,
//   subscribersController.redirectView
// );

router.get("/courses", coursesController.index, coursesController.indexView);
// router.get("/courses/new", coursesController.new);
router.post("/courses/create", coursesController.create, coursesController.redirectView);
router.get("/courses/:id/edit", coursesController.edit);
router.put("/courses/:id/update", coursesController.update, coursesController.redirectView);
router.get("/courses/:id", coursesController.show, coursesController.showView);
router.delete("/courses/:id/delete", coursesController.delete, coursesController.redirectView);

router.use(errorController.pageNotFoundError);
router.use(errorController.internalServerError);

app.use("/",router);
app.listen(app.get("port"),()=>{
    console.log(`App running on port ${app.get("port")}`)
});
// module.exports = router;
