const queryExecuter = require('../helper/queryExecuter');

exports.register = async (entriesDetails) => {
    const qry = `INSERT INTO client_entry (blp_id, date, time, nature, status, doneby, remarks1, nanosil, superflex, silicon, remarks2, food, food_remarks, accomodation, accomodation_remarks, travelling, travelling_remarks, expenses, expenses_remarks, billstatus, remarks3) VALUES ('${entriesDetails.blp_id}','${entriesDetails.date}','${entriesDetails.time}','${entriesDetails.nature}','${entriesDetails.status}','${entriesDetails.doneby}','${entriesDetails.remarks1}','${entriesDetails.nanosil}','${entriesDetails.superflex}','${entriesDetails.silicon}','${entriesDetails.remarks2}','${entriesDetails.food}','${entriesDetails.food_remarks}','${entriesDetails.accomodation}','${entriesDetails.accomodation_remarks}','${entriesDetails.travelling}','${entriesDetails.travelling_remarks}','${entriesDetails.expenses}','${entriesDetails.expenses_remarks}','${entriesDetails.billstatus}','${entriesDetails.remarks3}')`;
    const resp = await queryExecuter(qry);
    if(resp.status){
        const query = 'SELECT sr_no FROM client_entry ORDER BY sr_no DESC LIMIT 1;';
        const response = await queryExecuter(query);
        if(response.status){
            if(response.data === undefined){  
                return false;
            }
            else{
                return response.data[0].sr_no;
            }
        }
        else{
            return false;
        }
    }
    else{
        return false;
    }
}

exports.readAll = async () => {
    const query = "SELECT * FROM client_entry";
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
    const query = "SELECT * FROM client_entry WHERE blp_id = ?";
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

exports.updateEntries = async (sr_no, entriesDetails) => {
    const query = "UPDATE client_entry SET date = ?, time = ?, nature = ?, status = ?, doneby = ?, remarks1 = ?, nanosil = ?, superflex = ?, silicon = ?, remarks2 = ?, food = ?, food_remarks = ?, accomodation = ?, accomodation_remarks = ?, travelling = ?, travelling_remarks = ?, expenses = ?, expenses_remarks = ?, billstatus = ?, remarks3 = ? WHERE sr_no = ?";
    const response = await queryExecuter(query, [entriesDetails.date, entriesDetails.time, entriesDetails.nature, entriesDetails.status, entriesDetails.doneby, entriesDetails.remarks1, entriesDetails.nanosil, entriesDetails.superflex, entriesDetails.silicon, entriesDetails.remarks2, entriesDetails.food, entriesDetails.food_remarks, entriesDetails.accomodation, entriesDetails.accomodation_remarks, entriesDetails.travelling, entriesDetails.travelling_remarks, entriesDetails.expenses, entriesDetails.expenses_remarks, entriesDetails.billstatus, entriesDetails.remarks3, sr_no]);
    if(response.status){
        return true;
    }
    else{
        return false;
    }
}

exports.entriesIdCheck = async (sr_no) => {
    const query = "SELECT sr_no FROM client_entry WHERE sr_no = ?";
    const response = await queryExecuter(query, [sr_no]);
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

exports.deleteEntries = async (sr_no) => {
    const query = `DELETE FROM client_entry WHERE sr_no = ?`;
    const response = await queryExecuter(query, [sr_no]);
    if(response.status){
        return true;
    }
    else{
        return false;
    }
}

exports.getReport = async (fromDate, toDate) => {
    const query = `
    SELECT 
    CE.date, CD.blp_id, CD.isell, CD.dc_no, CD.name, CD.city, CE.nature, CE.status, CE.doneby, CE.remarks1, CE.time 
    FROM 
    client_details AS CD JOIN client_entry AS CE 
    ON CD.blp_id = CE.blp_id 
    WHERE CE.date BETWEEN ? AND ? 
    ORDER BY CE.date ASC;`;
    const response = await queryExecuter(query, [fromDate, toDate]);
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