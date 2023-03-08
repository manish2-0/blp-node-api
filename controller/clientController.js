const client = require("../model/client");

exports.register = async (req, res) => {
    const clientDetails = {};
    clientDetails.isell = req.body.isell;
    clientDetails.dc_no = req.body.dc_no;
    clientDetails.date = req.body.date;
    clientDetails.name = req.body.name;
    clientDetails.address = req.body.address;
    clientDetails.city = req.body.city;
    clientDetails.contact = req.body.contact;
    clientDetails.created_by = req.admin_id;
    let flag = true;
    let error = "Please Enter All Details";
    if (!clientDetails.isell) {
        flag = false;
    }
    if (flag && !clientDetails.dc_no) {
        flag = false;
    }
    if (flag && !clientDetails.date) {
        flag = false;
    }
    if (flag && !clientDetails.name) {
        flag = false;
    }
    if (flag && !clientDetails.address) {
        flag = false;
    }
    if (flag && !clientDetails.city) {
        flag = false;
    }
    if (flag && !clientDetails.contact) {
        flag = false;
    }
    if (flag) {
        const response = await client.register(clientDetails);
        if (response) {
            res.status(200).json({ status: true, message: "Client Registered Successfully" })
        }
        else {
            res.status(200).json({ status: false, message: response.actualError });
        }
    }
    else {
        res.status(200).json({ status: false, message: error });
    }
}

exports.getAll = async (req, res) => {
    const clients = await client.readAll();
    if (clients.status) {
        if (clients.data === undefined) {
            res.status(200).json({ status: true, message: clients.message });
        }
        else {
            res.status(200).json({ status: true, data: clients.data });
        }
    }
    else {
        res.status(200).json({ status: false, message: clients.error });
    }
}

exports.getOne = async (req, res) => {
    const { blp_id } = req.params;
    const clients = await client.readOne(blp_id);
    if (clients.status) {
        if (clients.data === undefined) {
            res.status(200).json({ status: true, message: clients.message });
        }
        else {
            res.status(200).json({ status: true, data: clients.data });
        }
    }
    else {
        res.status(200).json({ status: false, message: clients.error });
    }
}

exports.update = async (req, res) => {
    const { blp_id } = req.params;
    const clientDetails = {};
    clientDetails.isell = req.body.isell;
    clientDetails.dc_no = req.body.dc_no;
    clientDetails.date = req.body.date;
    clientDetails.name = req.body.name;
    clientDetails.address = req.body.address;
    clientDetails.city = req.body.city;
    clientDetails.contact = req.body.contact;
    clientDetails.last_modified_by = req.admin_id;
    clientDetails.bill_status = req.body.bill_status;
    clientDetails.work_status = req.body.work_status;
    let flag = true;
    let error = "Please Enter All Details";
    if (!clientDetails.isell) {
        flag = false;
    }
    if (flag && !clientDetails.dc_no) {
        flag = false;
    }
    if (flag && !clientDetails.date) {
        flag = false;
    }
    if (flag && !clientDetails.name) {
        flag = false;
    }
    if (flag && !clientDetails.address) {
        flag = false;
    }
    if (flag && !clientDetails.city) {
        flag = false;
    }
    if (flag && !clientDetails.contact) {
        flag = false;
    }
    if (flag && !clientDetails.bill_status) {
        flag = false;
    }
    if (flag && !clientDetails.work_status) {
        flag = false;
    }
    if (flag) {
        const check = await client.blpIdCheck(blp_id);
        if(check){
            const response = await client.updateClient(blp_id, clientDetails);
            if (response) {
                res.status(200).json({ status: true, message: "Client Updated Successfully" });
            }
            else {
                res.status(200).json({ status: false, message: "Something Went Wrong" });
            }
        }
        else{
            res.status(200).json({ status: false, message: "Invalid Blp Id" });
        }
    }
    else {
        res.status(200).json({ status: false, message: error });
    }
}

exports.billStatus = async (req, res) => {
    const { blp_id } = req.params;
    const check = await client.blpIdCheck(blp_id);
    if(check){
        const response = await client.updateBillStatus(blp_id);
        if (response) {
            res.status(200).json({ status: true, message: "Client Bill Status Updated Successfully" })
        }
        else {
            res.status(200).json({ status: false, message: "Something Went Wrong" });
        }
    }
    else{
        res.status(200).json({ status: false, message: "Invalid Blp Id" });
    }
}

exports.workStatus = async (req, res) => {
    const { blp_id } = req.params;
    const check = await client.blpIdCheck(blp_id);
    if(check){
        const response = await client.updateWorkStatus(blp_id);
        if (response) {
            res.status(200).json({ status: true, message: "Client Work Status Updated Successfully" })
        }
        else {
            res.status(200).json({ status: false, message: "Something Went Wrong" });
        }
    }
    else{
        res.status(200).json({ status: false, message: "Invalid Blp Id" });
    }
}