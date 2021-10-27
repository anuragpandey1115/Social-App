const UploadModel = require('./upload.model');

const FileUpload = async (req, res, next) => {
    try{
        let filesArray = [];
        req.files.forEach(element => {
            const file = {
                fileName: element.originalname,
                filePath: element.path,
                fileType: element.mimetype,
            }
            filesArray.push(file);
        });
        const multipleFiles = new UploadModel({
            title: req.body.title,
            files: filesArray 
        });
        await multipleFiles.save();
        res.status(201).json(multipleFiles)
    }catch(error) {
        res.status(400).send("error in uploading",error);
    }
}

module.exports= {FileUpload};
