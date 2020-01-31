const httpStatusCode = require("http-status-codes"),
htmlContentType = {"Content-Type":"text/html"},
utils = require("./utils"),
routes = {
    GET:{},
    POST:{}
};
exports.handler = (req,res)=> {
    if(routes[req.method][req.url]) {
        routes[req.method][req.url](req,res);
    } else {
        res.writeHead(httpStatusCode.NOT_FOUND, htmlContentType);
        utils.getFile(`views/error.html`,res)
    }
}

exports.get = (url, action)=>{
    routes['GET'][url] = action;
}

exports.post = (url, action)=>{
    routes['POST'][url] = action;
}
