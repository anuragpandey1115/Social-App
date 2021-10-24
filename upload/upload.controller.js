const UploadModel = require('./upload.model');

const FileUpload = async (req, res, next) => {
    try{
        let filesArray = [];
        req.files.forEach(element => {
            const file = {
                fileName: element.originalname,
                filePath: element.path,
                fileType: element.mimetype,
                // fileSize: fileSizeFormatter(element.size, 2)
            }
            filesArray.push(file);
        });
        const multipleFiles = new UploadModel({
            title: req.body.title,
            files: filesArray 
        });
        await multipleFiles.save();
        res.status(201).json(multipleFiles)
        // .send('Files Uploaded Successfully');
    }catch(error) {
        res.status(400).send("error in uploading",error.message);
    }
}

module.exports= {FileUpload};
