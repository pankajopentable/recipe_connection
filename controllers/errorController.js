const errorCodes = require("http-status-codes");
exports.logErrors = (error,req,res,next)=>{
    console.error(error.stack);
    console.log('Jkkl');
    next(error);
}

exports.notFound = (req,res)=>{
    let errCode = errorCodes.NOT_FOUND;
    res.status(errCode);
    res.render('error')
    // res.sendFile(`./public/404.html`,{root:'./'});
}

exports.respondInternalServerError = (error,req,res,next) => {
    let errCode = errorCodes.INTERNAL_SERVER_ERROR;
    res.status(errCode);
    res.send(`${errCode} | The page does not exists.`);
}