const jwt = require('jsonwebtoken');
const admin = require("../model/admin");

const authToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if(authHeader || typeof authHeader !== 'undefined'){
        const token = authHeader.split(' ')[1];
        jwt.verify(
            token,
            "blpaccess2023",
            async (err, decoded) => {
                if (err){
                    return res.status(403).json({status: false, error: "Unauthorized Access"});
                }
                const check = await admin.checkAdmin(decoded.admin_id);
                if(!check){
                    return res.status(403).json({status: false, error: "Unauthorized Access"});
                }
                req.admin_id = decoded.admin_id;
                next();
            }
        );
    }
    else{
        return res.status(403).json({status: false, error: "Unauthorized Access"});
    }
}

module.exports = authToken;