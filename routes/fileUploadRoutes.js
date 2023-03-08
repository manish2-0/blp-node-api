const express = require('express');
const path = require('path');
const fileUploadRouter = express.Router();
const fileUpload = require("../controller/fileUploadController");
const authToken = require("../middleware/auth");
const uploadFile = require("../middleware/upload");
const deleteFile = require("../middleware/delete");

fileUploadRouter.post("/upload/:sr_no", authToken, uploadFile, fileUpload.upload);

fileUploadRouter.delete("/delete/:file_no", authToken, deleteFile, fileUpload.delete);

fileUploadRouter.get("/get-files/:sr_no", authToken, fileUpload.viewFile);

fileUploadRouter.get("/view/:fileName", (req, res) => {
    let options = {
        root: path.join(__dirname, '../filesUpload'),
    }
    let fileName = req.params.fileName
    res.sendFile(fileName, options, (err) => {
        if (err) {
            res.status(200).json({ status: false, message: "Something Went Wrong" });
        }
    })
});

fileUploadRouter.get("/download/:fileName", (req, res) => {
    const filePath = path.join(__dirname, '../filesUpload', req.params.fileName);
    res.download(filePath, (err) => {
        if (err) {
            res.status(200).json({ status: false, message: "Something Went Wrong" });
        }
    });
});

module.exports = fileUploadRouter;