const fs = require("fs");
const filesUpload = require("../model/files");

const remove = async (sr_no) => {
    const DIR = './filesUpload/';
    const response = await filesUpload.getAllFiles(sr_no);
    if (response.status) {
        if (response.data === undefined) {
            return false;
        }
        else {
            const files = response.data;
            for (let file of files) {
                fs.unlink(DIR + file.fname, (err) => {
                    if (err) {
                    }
                });
            }
        }
    }
    else {
        return false;
    }
    const resp = await filesUpload.deleteAllFile(sr_no);
    if(resp){
        return true;
    }
    else{
        return false;
    }
};

module.exports = remove;