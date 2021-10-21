const userModel = require('../user/user.model');
const PostModel = require('./post.model');


//create post
exports.create = (async (req,res) =>{
    const newPost = new PostModel(req.body)
    try{
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    }catch(err){
        res.status(500).json(err);
    }
});


//update post
exports.update = (async (req,res) => {
    try{
        const post = await PostModel.findById(req.params.id);
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
        res.status(200).json(post);
    }catch(err){
        res.status(500).json(err);
    }
});


//get timeline post

exports.timeline=( async (req, res) => {
    try {
      const currentUser = await userModel.findById(req.params.userId);
      const userPosts = await PostModel.find({ userId: currentUser._id });
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
      const posts = await PostModel.find({ userId: user._id });
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
  });