const express = require('express')
let router = express.Router()
const UserController = require('./user.controller')
const AuthService = require('../auth.services');



router.post('/login',UserController.login );
router.post('/register',UserController.register );
router.put('/:id',AuthService.isloggedin,UserController.update ); 
router.delete('/:id',AuthService.isloggedin,UserController.delete ); 
router.get('/:id',AuthService.isloggedin,UserController.display ); 
router.put('/:id/follow',AuthService.isloggedin,UserController.follow ); 
router.put('/:id/unfollow',AuthService.isloggedin,UserController.unfollow ); 


module.exports = router;