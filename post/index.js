const express = require('express')
let router = express.Router()
const PostController = require('./post.controller')



router.post('/',PostController.create );

router.put('/:id',PostController.update ); 
router.delete('/:id',PostController.delete ); 
router.get('/:id',PostController.display ); 
router.put('/:id/like',PostController.like); 
router.get("/timeline/:userId",PostController.timeline ); 
router.get("/profile/:username", PostController.allPosts);


module.exports = router;