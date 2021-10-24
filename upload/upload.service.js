const multer = require("multer");
const fs = require("fs");
const path = require("path");



const storage = multer.diskStorage({
   
    destination: function(req, file, cb){
        console.log("in vedia controller")
        if(!fs.existsSync("./uploads")){
            fs.mkdirSync("./uploads")
        }
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(
          null,
          file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
      },
    });

    const maxSize = 25 * 1024 * 1024; // for 5MB
    const filefilter = (req, file, cb) => {
        const fileSize = parseInt(req.headers['content-length']);
        if ((file.mimetype === 'image/png' || file.mimetype === 'image/jpg' 
            || file.mimetype === 'image/jpeg')&& (fileSize <= maxSize)){
                cb(null, true);
            }else if(file.mimetype === 'video/mp4' && fileSize <= maxSize) {

                cb(null, true);
                
                }
            else {
                cb(null, false);
            }
    }

    const upload = multer({storage: storage, fileFilter: filefilter});

    module.exports = {upload}



   