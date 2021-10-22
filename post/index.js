const express = require('express')
let router = express.Router()
const PostController = require('./post.controller')
const AuthService = require('../auth.services');



router.post('/',AuthService.isloggedin, PostController.create );

router.put('/:id', AuthService.isloggedin, PostController.update ); 
router.delete('/:id' ,  AuthService.isloggedin, PostController.delete ); 
router.get('/:id',  AuthService.isloggedin, PostController.display ); 
router.put('/:id/like',  AuthService.isloggedin,PostController.like); 
router.get("/timeline/:userId", AuthService.isloggedin,PostController.timeline ); 
router.get("/profile/:username", AuthService.isloggedin, PostController.allPosts);


module.exports = router;