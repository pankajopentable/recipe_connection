const fs = require('fs'),
httpStatusCodes = require("http-status-codes"),
contentTypes=require("./contentTypes");

module.exports = {
    getFile: ( file,res ) => {
        fs.readFile(file,(err,data)=>{
            if(err) {
                res.writeHead(httpStatusCodes.INTERNAL_SERVER_ERROR, contentTypes.html);
                res.end("File not found.")
            }
            res.end(data);
        })
    }
}
