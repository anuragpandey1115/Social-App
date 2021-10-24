const express = require('express');
let router = express.Router();
let userroutes = require('./user')
let postroutes = require('./post')
let uploadroutes = require('./upload');


router.use('/user', userroutes)
router.use('/post', postroutes)
router.use('/upload', uploadroutes)

module.exports = router;