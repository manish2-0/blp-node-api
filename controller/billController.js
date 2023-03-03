const fsPromises = require('fs').promises;
const path = require('path');
const client = require("../model/client");

exports.upload = async (req, res) => {
    const { blp_id } = req.params;
    const check = await client.blpIdCheck(blp_id);
    if (check) {
        const fileName = blp_id.toUpperCase();
        const billData = JSON.stringify(req.body);
        try {
            await fsPromises.writeFile(path.join(__dirname, '../bills', `${fileName}.json`), billData);
            res.status(200).json({ status: true, message: "Client Bill Updated Successfully" });
        }
        catch (err) {
            res.status(200).json({ status: false, message: "Something Went Wrong" });
        }
    }
    else {
        res.status(200).json({ status: false, message: "Invalid Blp Id" });
    }
}

exports.get = async (req, res) => {
    const { blp_id } = req.params;
    const check = await client.blpIdCheck(blp_id);
    if (check) {
        const fileName = blp_id.toUpperCase();
        try {
            const billData = await fsPromises.readFile(path.join(__dirname, '../bills', `${fileName}.json`), "utf8");
            res.status(200).send(billData);
        }
        catch (err) {
            res.status(200).json({ status: false, message: "Something Went Wrong" });
        }
    }
    else {
        res.status(200).json({ status: false, message: "Invalid Blp Id" });
    }
}