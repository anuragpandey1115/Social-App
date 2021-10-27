const UserModel = require('./user.model');

exports.findUser = function(data){
    var query ={
        email:data.email,
    }
    return new Promise(function(resolve,reject){
        UserModel.findOne(query).then(function(result){
            resolve(result)
        },function(error){
            reject(error)
        })
    })
}