express = require("express"),
layouts = require("express-ejs-layouts"),
homeController=require("./controllers/homeController"),
errorController = require("./controllers/errorController"),
MongoDB = require("mongodb").MongoClient,
mongoose = require("mongoose"),
app = express();
const dbUrl = "mongodb+srv://recipe_pankaj:c3lcq3kXRMK50EPp@cluster0-tdqek.mongodb.net/recipe_db?retryWrites=true&w=majority";
const dbName = 'recipe_db';
mongoose.connect(dbUrl,{useNewUrlParser:true,useUnifiedTopology:true});
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
app.post("/",homeController.postSignup);


app.use(errorController.logErrors);
app.use(errorController.notFound);
app.listen(app.get("port"),()=>{
    console.log(`App running on port ${app.get("port")}`)
});