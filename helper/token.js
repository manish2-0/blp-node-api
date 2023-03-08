const jwt = require('jsonwebtoken');

const token = {
    generateRefreshToken : function (admin_id) {
        const refreshToken = jwt.sign(
            { "admin_id": admin_id },
            "blprefresh2023",
            { expiresIn: '60m' }
        );
        return refreshToken;
    },
    generateAccessToken : function (admin_id) {
        const accessToken = jwt.sign(
            { "admin_id": admin_id },
            "blpaccess2023",
            { expiresIn: '60m' }
        );
        return accessToken;
    }
}

module.exports = token;