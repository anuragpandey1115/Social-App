const userModel = require('../user/user.model');
const PostModel = require('./post.model');
const UploadModel = require('../upload/upload.model');
const { query } = require('express');

//create post
exports.create = (async (req,res) =>{
    const query = req.body.fileId
    console.log("query is ",query)
    const file = await UploadModel.findById(query);
    !file && res.status(404).json("post not found");

    dataToAdd = file.files
    console.log("uploading files",file)
    console.log("datato add files",dataToAdd)
    var body = req.body
    body.files = dataToAdd
    const newPost = new PostModel(body)
    // console.log("newPost",newPost)
    // await newPost.updateOne({$insert:dataToAdd})

    try{
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
        console.log(savedPost)
    }catch(err){
        res.status(500).json(err);
    }
});


//update post
exports.update = (async (req,res) => {
    try{
        const post = await PostModel.findById(req.params.id);
        !post && res.status(404).json("post not found");
        if(post.userId === req.body.userId){
            await post.updateOne({$set:req.body});
            res.status(200).json("your post has been updated");
        }else{
            res.status(403).json("you can update only your posts")
        }
    } catch(err){
        res.status(500).json(err);
    }
   

});

//delete post
exports.delete = (async (req,res) => {
    try{
        const post = await PostModel.findById(req.params.id);
        !post && res.status(404).json("post not found");
        if(post.userId === req.body.userId){
            await post.deleteOne({$set:req.body});
            res.status(200).json("your post has been deleted");
        }else{
            res.status(403).json("you can delete only your posts")
        }
    } catch(err){
        res.status(500).json(err);
    }
   

});

//like & dislike post
exports.like = (async(req,res)=>{
    try{
        const post = await PostModel.findById(req.params.id);
        !post && res.status(404).json("post not found");
        if(!post.likes.includes(req.body.userId)) {
            await post.updateOne({$push:{likes:req.body.userId}});
            res.status(200).json("the post has been liked");
        }else{
            await post.updateOne({$pull:{likes: req.body.userId}});
            res.status(200).json("the post has been disliked")
        }
    }catch(err){
        res.status(500).json(err)
    }
})

//get a post

exports.display = (async(req,res)=>{
    try{
        const post = await PostModel.findById(req.params.id);
        // await post.populate('fileId').execPopulate()
        res.status(200).json(post);
    }catch(err){
        res.status(500).json(err);
    }
});


//get timeline post

exports.timeline=( async (req, res) => {
    try {
      const currentUser = await userModel.findById(req.params.userId);
      !currentUser && res.status(404).json("current user not found");
      const userPosts = await PostModel.find({ userId: currentUser._id });
      !userPosts && res.status(404).json("current user post not found");
      const friendPosts = await Promise.all(
        currentUser.followings.map((friendId) => {
          return PostModel.find({ userId: friendId });
        })
      );
      res.status(200).json(userPosts.concat(...friendPosts));
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //get user's all posts

 exports.allPosts = (async (req, res) => {
    try {
      const user = await userModel.findOne({ username: req.params.username });
      !user && res.status(404).json(" user not found");
      const posts = await PostModel.find({ userId: user._id });
      !posts && res.status(404).json(" user post not found");
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
  });