const express = require('express');
let router = express.Router();
let userroutes = require('./user')
let postroutes = require('./post')


router.use('/user', userroutes)
router.use('/post', postroutes)

module.exports = router;