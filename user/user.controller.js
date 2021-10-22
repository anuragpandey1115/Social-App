const UserModel = require('./user.model');
const bcrypt = require('bcrypt');
const AuthService = require('../auth.services');
const Userservice = require('./user.service');
// Register User
exports.register = (async (req,res) =>{

 
    try {
        // generate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
        // create new user
        console.log("in register")
        const newUser = new UserModel({
          username: req.body.username,
          email: req.body.email,
          password: hashedPassword,
        });
    console.log("newuser",newUser);
        //save user and respond
        const user = await newUser.save();
        console.log("saving")
        res.status(200).json(user);
      } catch (err) {
        console.log("saving error",err)
        res.status(500).json(err)
      }
});

//Login User
// exports.login = (async (req,res) =>{
//   try {
//     const user = await UserModel.findOne({ email: req.body.email });
//     !user && res.status(404).json("user not found");

   

//     const validPassword = await bcrypt.compare(req.body.password, user.password)
//     !validPassword && res.status(400).json("wrong password")

//     res.status(200).send("Login Successful")
//   } catch (err) {
//     res.status(500).json(err)
//   }
// });

//login user
exports.login = function(req,res){
  console.log("data received",req.body)
  console.log("email",req.body.email)
  
    var query ={
            email:req.body.email,
            password:req.body.password,
      
        }
        //find user
      Userservice.findUser(req.body).then(function(result){
      if(result){
        console.log("found user",result);
        var payload = {
          email:result.email,
        }
        console.log("user password",result.password)
        console.log("req body password",req.body.password)
        //validate password
        const validPassword =  bcrypt.compare(req.body.password, result.password)
        if(!validPassword){
            res.send("wrong password")
          }else{
            console.log("password is validated")
          }
          //creating token
        AuthService.createToken(payload, function(error, token){
          if(error){
            res.send("token not generated")
          }
          else{
            res.set("authtoken",token)

            res.send({
                message:"Login Successful"
            })
          }
        });
      }else{
          res.send({
            message:"Invalid Credentials"
          })
        }
    },function(error){
      res.status(500).json("internal server error")
    });
  

}


//Update User
exports.update = (async (req,res) => {
  console.log(req.body);
  console.log(req.body.userId);
  console.log(req.params.id);
  if(req.body.userId === req.params.id || req.body.isAdmin){
    if(req.body.password){
      try{
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      }catch(err){
        return res.status(500).json(err);
      }
    }
    try{
      const user = await UserModel.findByIdAndUpdate(req.params.id,{
        $set: req.body,
      });
      res.status(200).json(user);
    } catch(err){
      return res.status(500).json(err);
    }
  } else{
    return res.status(403).json("you can update only your account ");
  }
});

// Delete User
exports.delete = (async (req,res) => {
  console.log(req.body);
  console.log(req.body.userId);
  console.log(req.params.id);
  if(req.body.userId === req.params.id || req.body.isAdmin){
    try{
      const user = await UserModel.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted");
    } catch(err){
      return res.status(500).json(err);
    }
  } else{
    return res.status(403).json("you can delete0 only your account ");
  }
});

// get users
exports.display = (async (req,res) =>{
  try{
const user = await UserModel.findById(req.params.id);
const {password, updatedAt,__v, ...other} = user._doc
res.status(200).json(other);
  }catch{
    res.status(500).json(err);
  }
});

//follow user

exports.follow = (async (req,res) =>{
  if(req.body.userId !== req.params.id){
    try{
      const user = await UserModel.findById(req.params.id);
      const currentUser = await UserModel.findById(req.body.userId);
      if(!user.followers.includes(req.body.userId)){
        await user.updateOne({ $push:{ followers: req.body.userId}});
        await currentUser.updateOne({ $push:{ followings: req.params.id}});
        res.status(200).json("user has beemn followed");
      }else {
        res.status(403).json("you already followed this user")
      }
    }catch(err){
      res.status(500).json(err);
    }
  }else{
    res.status(403).json("you can not follow yourself");
  }
});

//unfollow user
exports.unfollow = (async (req,res) =>{
  if(req.body.userId !== req.params.id){
    try{
      const user = await UserModel.findById(req.params.id);
      const currentUser = await UserModel.findById(req.body.userId);
      if(user.followers.includes(req.body.userId)){
        await user.updateOne({ $pull:{ followers: req.body.userId}});
        await currentUser.updateOne({ $pull:{ followings: req.params.id}});
        res.status(200).json("user has beemn unfollowed");
      }else {
        res.status(403).json("you already unfollowed this user")
      }
    }catch(err){
      res.status(500).json(err);
    }
  }else{
    res.status(403).json("you can not unfollow yourself");
  }
});