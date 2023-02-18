const filesUpload = require("../model/files");

exports.upload = async (req, res) => {
    const sr_no = req.params.sr_no;
    const files = req.files;
    let flag;
    for (let file of files) {
        const response = await filesUpload.registerFile(sr_no, file.filename);
        if (response) {
            flag = true;
        }
        else {
            flag = false;
        }
    }
    if(flag){
        res.status(200).json({ status: true, message: "Filed Uploaded Successfully" });
    }
    else{
        res.status(200).json({ status: false, message: "Something Went Wrong" });
    }
}

exports.viewFile = async (req, res) => {
    const sr_no = req.params.sr_no;
    const allFiles = await filesUpload.getAllFiles(sr_no);
    if (allFiles.status) {
        if (allFiles.data === undefined) {
            res.status(200).json({ status: true, message: allFiles.message });
        }
        else {
            const files = allFiles.data;
            for(let file of files){
                file.flink = `http://localhost:8000/file/image/${file.fname}`;
            }
            res.status(200).json({ status: true, data: files });
        }
    }
    else {
        res.status(200).json({ status: false, message: allFiles.error });
    }
}

exports.delete = async (req, res) => {
    const file_no = req.params.file_no;
    const response = await filesUpload.deleteFile(file_no);
    if (response) {
        res.status(200).json({ status: true, message: "File deleted Successfully" })
    }
    else {
        res.status(200).json({ status: false, message: "Something Went Wrong" });
    }
}