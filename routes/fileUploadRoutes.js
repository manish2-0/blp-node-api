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

fileUploadRouter.use("/image", express.static(path.join(__dirname, '../filesUpload')));

module.exports = fileUploadRouter;