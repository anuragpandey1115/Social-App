const express = require('express')
let router = express.Router()
const UserController = require('./user.controller')



router.post('/login',UserController.login );
router.post('/register',UserController.register );
router.put('/:id',UserController.update ); 
router.delete('/:id',UserController.delete ); 
router.get('/:id',UserController.display ); 
router.put('/:id/follow',UserController.follow ); 
router.put('/:id/unfollow',UserController.unfollow ); 


module.exports = router;