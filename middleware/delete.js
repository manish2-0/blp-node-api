const fs = require("fs");
const filesUpload = require("../model/files");

const remove = async (req, res, next) => {
  const file_no = req.params.file_no;
  const DIR = './filesUpload/';
  const fileName = await filesUpload.getFileName(file_no);
  if (fileName) {
    fs.unlink(DIR + fileName, (err) => {
      if (err) {
        return res.status(200).send({
          status: false,
          message: "Could not delete the file."
        });
      }
      next();
    });
  }
  else {
    return res.status(200).send({
      status: false,
      message: "Invalid FileId or File Not Exists or Already Deleted"
    });
  }
};

module.exports = remove;