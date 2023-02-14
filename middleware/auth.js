const jwt = require('jsonwebtoken');
// require('dotenv').config();

const authToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if(authHeader || typeof authHeader !== 'undefined'){
        const token = authHeader.split(' ')[1];
        jwt.verify(
            token,
            "blpaccess2023",
            (err, decoded) => {
                if (err){
                    res.status(403).json({status: false, error: "Unauthorized Access"});
                }
                req.admin_id = decoded.admin_id;
                next();
            }
        );
    }
    else{
        res.status(403).json({status: false, error: "Unauthorized Access"});
    }
}

module.exports = authToken;