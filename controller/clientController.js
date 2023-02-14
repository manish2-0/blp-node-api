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
    if(!clientDetails.isell){
        flag = false;
    }
    if(!clientDetails.dc_no){
        flag = false;
    }
    if(!clientDetails.date){
        flag = false;
    }
    if(!clientDetails.name){
        flag = false;
    }
    if(!clientDetails.address){
        flag = false;
    }
    if(!clientDetails.city){
        flag = false;
    }
    if(!clientDetails.contact){
        flag = false;
    }
    if(flag){
        const response = await client.register(clientDetails);
        if(response){
            res.status(200).json({status: true, message: "Client Registered Successfully"})
        }
        else{
            res.status(200).json({status: false, message : "Something Went Wrong"});
        }
    }
    else{
        res.status(200).json({status: false, message : error});
    }
}

exports.getAll = async (req, res) => {
    const clients = await client.readAll();
    if(clients.status){
        if(clients.data === undefined){
            res.status(200).json({status: true, message: clients.message});
        }
        else{
            res.status(200).json({status: true, data: clients.data});
        }
    }
    else{
        res.status(200).json({status: false, message: clients.error});
    }
}
