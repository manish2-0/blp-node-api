const entries = require("../model/entries");
const deleteFile = require("../helper/delete");

exports.register = async (req, res) => {
    const entriesDetails = {};
    entriesDetails.blp_id = req.body.blp_id;
    entriesDetails.date = req.body.date;
    entriesDetails.time = req.body.time;
    entriesDetails.nature = req.body.nature;
    entriesDetails.status = req.body.status;
    entriesDetails.doneby = req.body.doneby;
    entriesDetails.remarks1 = req.body.remarks1;
    entriesDetails.nanosil = req.body.nanosil;
    entriesDetails.superflex = req.body.superflex;
    entriesDetails.silicon = req.body.silicon;
    entriesDetails.remarks2 = req.body.remarks2;
    entriesDetails.food = req.body.food;
    entriesDetails.food_remarks = req.body.food_remarks;
    entriesDetails.accomodation = req.body.accomodation;
    entriesDetails.accomodation_remarks = req.body.accomodation_remarks;
    entriesDetails.travelling = req.body.travelling;
    entriesDetails.travelling_remarks = req.body.travelling_remarks;
    entriesDetails.expenses = req.body.expenses;
    entriesDetails.expenses_remarks = req.body.expenses_remarks;
    entriesDetails.billstatus = req.body.billstatus;
    entriesDetails.remarks3 = req.body.remarks3;
    let flag = true;
    let error = "Please Enter All Details";
    if (!entriesDetails.blp_id) {
        flag = false;
    }
    if (flag && !entriesDetails.date) {
        flag = false;
    }
    if (flag && !entriesDetails.time) {
        flag = false;
    }
    if (flag && !entriesDetails.nature) {
        flag = false;
    }
    if (flag && !entriesDetails.status) {
        flag = false;
    }
    if (flag && !entriesDetails.doneby) {
        flag = false;
    }
    if (flag && !entriesDetails.remarks1) {
        flag = false;
    }
    if (flag && !entriesDetails.nanosil) {
        flag = false;
    }
    if (flag && !entriesDetails.superflex) {
        flag = false;
    }
    if (flag && !entriesDetails.silicon) {
        flag = false;
    }
    if (flag && !entriesDetails.remarks2) {
        flag = false;
    }
    if (flag && !entriesDetails.food) {
        flag = false;
    }
    if (flag && !entriesDetails.food_remarks) {
        flag = false;
    }
    if (flag && !entriesDetails.accomodation) {
        flag = false;
    }
    if (flag && !entriesDetails.accomodation_remarks) {
        flag = false;
    }
    if (flag && !entriesDetails.travelling) {
        flag = false;
    }
    if (flag && !entriesDetails.travelling_remarks) {
        flag = false;
    }
    if (flag && !entriesDetails.expenses) {
        flag = false;
    }
    if (flag && !entriesDetails.expenses_remarks) {
        flag = false;
    }
    if (flag && !entriesDetails.billstatus) {
        flag = false;
    }
    if (flag && !entriesDetails.remarks3) {
        flag = false;
    }
    if (flag) {
        const response = await entries.register(entriesDetails);
        if (response) {
            res.status(200).json({ status: true, sr_no: response, message: "Entries Registered Successfully" })
        }
        else {
            res.status(200).json({ status: false, message: "Something Went Wrong" });
        }
    }
    else {
        res.status(200).json({ status: false, message: error });
    }
}

exports.getAll = async (req, res) => {
    const entriess = await entries.readAll();
    if (entriess.status) {
        if (entriess.data === undefined) {
            res.status(200).json({ status: true, message: entriess.message });
        }
        else {
            res.status(200).json({ status: true, data: entriess.data });
        }
    }
    else {
        res.status(200).json({ status: false, message: entriess.error });
    }
}

exports.getOne = async (req, res) => {
    const { blp_id } = req.params;
    const entriess = await entries.readOne(blp_id);
    if (entriess.status) {
        if (entriess.data === undefined) {
            res.status(200).json({ status: true, message: entriess.message });
        }
        else {
            res.status(200).json({ status: true, data: entriess.data });
        }
    }
    else {
        res.status(200).json({ status: false, message: entriess.error });
    }
}

exports.update = async (req, res) => {
    const { sr_no } = req.params;
    const entriesDetails = {};
    entriesDetails.blp_id = req.body.blp_id;
    entriesDetails.date = req.body.date;
    entriesDetails.time = req.body.time;
    entriesDetails.nature = req.body.nature;
    entriesDetails.status = req.body.status;
    entriesDetails.doneby = req.body.doneby;
    entriesDetails.remarks1 = req.body.remarks1;
    entriesDetails.nanosil = req.body.nanosil;
    entriesDetails.superflex = req.body.superflex;
    entriesDetails.silicon = req.body.silicon;
    entriesDetails.remarks2 = req.body.remarks2;
    entriesDetails.food = req.body.food;
    entriesDetails.food_remarks = req.body.food_remarks;
    entriesDetails.accomodation = req.body.accomodation;
    entriesDetails.accomodation_remarks = req.body.accomodation_remarks;
    entriesDetails.travelling = req.body.travelling;
    entriesDetails.travelling_remarks = req.body.travelling_remarks;
    entriesDetails.expenses = req.body.expenses;
    entriesDetails.expenses_remarks = req.body.expenses_remarks;
    entriesDetails.billstatus = req.body.billstatus;
    entriesDetails.remarks3 = req.body.remarks3;
    let flag = true;
    let error = "Please Enter All Details";
    if (!entriesDetails.blp_id) {
        flag = false;
    }
    if (flag && !entriesDetails.date) {
        flag = false;
    }
    if (flag && !entriesDetails.time) {
        flag = false;
    }
    if (flag && !entriesDetails.nature) {
        flag = false;
    }
    if (flag && !entriesDetails.status) {
        flag = false;
    }
    if (flag && !entriesDetails.doneby) {
        flag = false;
    }
    if (flag && !entriesDetails.remarks1) {
        flag = false;
    }
    if (flag && !entriesDetails.nanosil) {
        flag = false;
    }
    if (flag && !entriesDetails.superflex) {
        flag = false;
    }
    if (flag && !entriesDetails.silicon) {
        flag = false;
    }
    if (flag && !entriesDetails.remarks2) {
        flag = false;
    }
    if (flag && !entriesDetails.food) {
        flag = false;
    }
    if (flag && !entriesDetails.food_remarks) {
        flag = false;
    }
    if (flag && !entriesDetails.accomodation) {
        flag = false;
    }
    if (flag && !entriesDetails.accomodation_remarks) {
        flag = false;
    }
    if (flag && !entriesDetails.travelling) {
        flag = false;
    }
    if (flag && !entriesDetails.travelling_remarks) {
        flag = false;
    }
    if (flag && !entriesDetails.expenses) {
        flag = false;
    }
    if (flag && !entriesDetails.expenses_remarks) {
        flag = false;
    }
    if (flag && !entriesDetails.billstatus) {
        flag = false;
    }
    if (flag && !entriesDetails.remarks3) {
        flag = false;
    }
    if (flag) {
        const check = await entries.entriesIdCheck(sr_no);
        if(check){
            const response = await entries.updateEntries(sr_no, entriesDetails);
            if (response) {
                res.status(200).json({ status: true, message: "Entries updated Successfully" })
            }
            else {
                res.status(200).json({ status: false, message: "Something Went Wrong" });
            }
        }
        else{
            res.status(200).json({ status: false, message: "Invalid srno" });
        }
    }
    else {
        res.status(200).json({ status: false, message: error });
    }
}

exports.delete = async (req, res) => {
    const { sr_no } = req.params;
    const check = await entries.entriesIdCheck(sr_no);
    if(check){
        const response = await entries.deleteEntries(sr_no);
        if (response) {
            const resp = await deleteFile(sr_no);
            res.status(200).json({ status: true, message: "entries deleted Successfully" })
        }
        else {
            res.status(200).json({ status: false, message: "Something Went Wrong" });
        }
    }
    else{
        res.status(200).json({ status: false, message: "Invalid srno" });
    }
}
