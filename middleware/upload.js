const multer = require('multer');

const DIR = './filesUpload';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, Date.now() + '-' + fileName)
    }
});

const upload = async (req, res, next) => {
    const uploadMulter = multer({ storage: storage }).array('files', 10); 
    uploadMulter(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          // A Multer error occurred when uploading.
          return res.status(200).json({status : false, meaasage: "Error Occured1"})
        } else if (err) {
          // An unknown error occurred when uploading.
          return res.status(200).json({status : false, meaasage: "Error Occured"})   
        }
        next();
    })
}
module.exports = upload;