const UserModel = require('./user.model');

exports.findUser = function(data){
    var query ={
        email:data.email,
    }

    return new Promise(function(resolve,reject){
        // console.log("i have to do some work", data)
        UserModel.findOne(query).then(function(result){
            // console.log("result os find user", result)
            resolve(result)
        },function(error){
            reject(error)
        })
    })
}