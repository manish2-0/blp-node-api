const queryExecuter = require('../helper/queryExecuter');

exports.registerFile = async (sr_no, filename) => {
    const query = `INSERT INTO files (sr_no, fname) VALUES ('${sr_no}','${filename}')`;
    const response = await queryExecuter(query);
    if(response.status){
        return true;
    }
    else{
        return false;
    }
}

exports.getFileName = async (file_no) => {
    const query = `SELECT fname FROM files WHERE file_no = ?`;
    const response = await queryExecuter(query, [file_no]);
    if(response.status){
        if(response.data === undefined){  
            return false;
        }
        else{
            return response.data[0].fname;
        }
    }
    else{
        return false;
    }
}

exports.getAllFiles = async (sr_no) => {
    const query = `SELECT * FROM files WHERE sr_no = ?`;
    const response = await queryExecuter(query, [sr_no]);
    if(response.status){
        if(response.data === undefined){
            response.message = "No Files Found";
        }
        return response;
    }
    else{
        return response;
    }
}

exports.deleteFile = async (file_no) => {
    const query = `DELETE FROM files WHERE file_no = ?`;
    const response = await queryExecuter(query, [file_no]);
    if(response.status){
        return true;
    }
    else{
        return false;
    }
}

exports.deleteAllFile = async (sr_no) => {
    const query = `DELETE FROM files WHERE sr_no = ?`;
    const response = await queryExecuter(query, [sr_no]);
    if(response.status){
        return true;
    }
    else{
        return false;
    }
}