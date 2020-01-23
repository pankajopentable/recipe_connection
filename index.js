const port =3000,
http = require("http"),
httpStatus = require("http-status-codes"),
utils = require("./utils"),
contentTypes = require("./contentTypes"),
// app = http.createServer(),
fs=require("fs"),
routers=require("./routes");


const sendErrorMessages = (res)=>{
    res.writeHead(httpStatus.NOT_FOUND,contentTypes.html);
    res.end("NOT FOUND")
}
routers.get('/index.html',(req,res)=>{
    res.writeHead(httpStatus.OK,contentTypes.html);
    utils.getFile("views/index.html",res);
});
routers.get('/contact.html',(req,res)=>{
    res.writeHead(httpStatus.OK,contentTypes.html);
    utils.getFile("views/contact.html",res);
});
routers.get('/courses.html',(req,res)=>{
    res.writeHead(httpStatus.OK,contentTypes.html);
    utils.getFile("views/courses.html",res);
});
routers.get('/thanks.html',(req,res)=>{
    res.writeHead(httpStatus.OK,contentTypes.html);
    utils.getFile("views/thanks.html",res);
});
routers.post('/',(req,res)=>{
    res.writeHead(httpStatus.OK,contentTypes.html);
    utils.getFile("views/thanks.html",res);
});
routers.get("/bootstrap.css",(req,res)=>{
    res.writeHead(httpStatus.OK,contentTypes.css)
    utils.getFile('public/css/bootstrap.css',res);
})
routers.get("/confetti_cuisine.css",(req,res)=>{
    res.writeHead(httpStatus.OK,contentTypes.css)
    utils.getFile('public/css/confetti_cuisine.css',res);
})
routers.get("/product.jpg",(req,res)=>{
    res.writeHead(httpStatus.OK,contentTypes.jpg)
    utils.getFile('public/images/product.jpg',res);
})
app=http.createServer(routers.handler).listen(port);


