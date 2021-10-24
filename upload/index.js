const express = require('express')
let router = express.Router()
const uploadController = require('./upload.controller');
const uploadService = require('./upload.service')

router.post('/file',uploadService.upload.array('files'),uploadController.FileUpload);

module.exports = router;