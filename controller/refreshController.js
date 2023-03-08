const refresh = require("../model/refresh");
const token = require("../helper/token");
const jwt = require('jsonwebtoken');
const admin = require("../model/admin");

exports.getToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.refreshJwt) {
        return res.status(200).json({ status: false, message: "No Cookie Found" });
    }
    else {
        const refreshToken = cookies.refreshJwt;
        const findRefresh = await refresh.checkRefresh(refreshToken);
        if (!findRefresh) {
            return res.status(200).json({ status: false, message: "Invalid Refresh Token Sent" });
        }
        else if (findRefresh) {

            jwt.verify(
                refreshToken,
                "blprefresh2023",
                async (err, decoded) => {
                    if (err) {
                        const deleteToken = await refresh.deleteRefresh(refreshToken);
                        res.clearCookie('refreshJwt', { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
                        return res.status(403).json({ status: false, error: "Invalid Refresh Token Sent" });
                    }
                    else {
                        const check = await admin.checkAdmin(decoded.admin_id);
                        if (!check) {
                            return res.status(403).json({ status: false, error: "Invalid Refresh Token Sent" });
                        }
                        else if (check) {
                            const admin_id = decoded.admin_id;
                            const accessToken = token.generateAccessToken(admin_id);
                            return res.status(200).json({ status: true, accessToken: accessToken, message: "New Token Generated Successfully" });
                        }
                    }
                }
            );
        }
    }
}