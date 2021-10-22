const jwt = require('jsonwebtoken')

exports.createToken =  function(payload,callback){
    console.log("creating Token")
    jwt.sign(payload,"mysecret",{expiresIn:"1h"},function(error, token){
        console.log("ahter jwt.sign")
        if(error){
            callback(error,null)
            console.log("errornnnnnn",error);
        }
        else{
            callback(null,token)
            console.log("token is created",token);
        }
    })
}

exports.isloggedin = function(req,res,next){
    var token = req.get("authtoken")
    jwt.verify(token,"mysecret", function(error,payload) {
        if(error){
            res.status(401).send({
                error:"UnAuthorised User in logging"
            })
        }
        else{
            next()
        }
       });
}