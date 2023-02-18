const queryExecuter = require('../helper/queryExecuter');
const date = require('date-and-time');

async function generateBLPID(){
    let num = 100001;
    const response = await queryExecuter("SELECT COUNT(blp_id) as count FROM client_details");
    const count = response.data[0].count;
    num = num + count;
    let id = "BLP" + num;
    return id;
} 

exports.register = async (clientDetails) => {
    let now = new Date();
    const created_at= date.format(now, 'YYYY-MM-DD HH:mm:ss');
    const blp_id = await generateBLPID();
    const qry = `INSERT INTO client_details (blp_id, isell, dc_no, date, name, address, city, contact, created_by, created_at) VALUES ('${blp_id}','${clientDetails.isell}','${clientDetails.dc_no}','${clientDetails.date}','${clientDetails.name}','${clientDetails.address}','${clientDetails.city}','${clientDetails.contact}','${clientDetails.created_by}','${created_at}')`;
    const resp = await queryExecuter(qry);
    if(resp.status){
        return true;
    }
    else{
        return false;
    }
}

exports.readAll = async () => {
    const query = "SELECT * FROM client_details";
    const response = await queryExecuter(query);
    if(response.status){
        if(response.data === undefined){
            response.message = "No Data Found";
        }
        return response;
    }
    else{
        return response;
    }
}

exports.readOne = async (blp_id) => {
    const query = "SELECT * FROM client_details WHERE blp_id = ?";
    const response = await queryExecuter(query, [blp_id]);
    if(response.status){
        if(response.data === undefined){
            response.message = "No Data Found";
        }
        return response;
    }
    else{
        return response;
    }
}

exports.updateClient = async (blp_id, clientDetails) => {
    let now = new Date();
    const last_modified_at= date.format(now, 'YYYY-MM-DD HH:mm:ss');
    const query = "UPDATE client_details SET isell = ?, dc_no = ?, date = ?, name = ?, address = ?, city = ?, contact = ?, last_modified_by = ?, last_modified_at = ? WHERE blp_id = ?";
    const response = await queryExecuter(query, [clientDetails.isell, clientDetails.dc_no, clientDetails.date, clientDetails.name, clientDetails.address, clientDetails.city, clientDetails.contact, clientDetails.last_modified_by, last_modified_at, blp_id]);
    if(response.status){
        return true;
    }
    else{
        return false;
    }
}

exports.blpIdCheck = async (blp_id) => {
    const query = "SELECT blp_id FROM client_details WHERE blp_id = ?";
    const response = await queryExecuter(query, [blp_id]);
    if(response.status){
        if(response.data === undefined){
            return false;
        }
        else{
            return true;
        }
    }
    else{
        return false;
    }
}