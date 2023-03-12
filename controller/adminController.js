const admin = require("../model/admin");
const refresh = require("../model/refresh");
const token = require("../helper/token");
const date = require('date-and-time');

exports.signup = async (req, res) => {
    const { admin_id } = req.body;
    const { password } = req.body;
    let flag = true;
    if (!admin_id || !password) {
        flag = false;
        error = "Please Enter Credentials";
    }
    if (flag) {
        const response = await admin.register(admin_id, password);
        if (response.status) {
            res.status(200).json({ status: true, message: response.message });
        }
        else {
            res.status(200).json({ status: false, message: response.error });
        }
    }
    else if (!flag) {
        res.status(200).json({ status: false, message: error });
    }
}

exports.login = async (req, res) => {
    const { admin_id } = req.body;
    const { password } = req.body;
    let flag = true;
    if (!admin_id) {
        flag = false;
        error = "Please Enter AdminId";
    }
    if (flag && !password) {
        flag = false;
        error = "Please Enter Password";
    }
    if (flag) {
        const response = await admin.login(admin_id, password);
        if (response.status) {
            if (response.check) {
                const refreshTokenExpire = 10;
                const refreshToken = token.generateRefreshToken(admin_id);
                const accessToken = token.generateAccessToken(admin_id);
                let now = new Date();
                const createdAt = date.format(now, 'YYYY-MM-DD HH:mm:ss');
                const expiryAt = date.format(date.addMinutes(now, +refreshTokenExpire), 'YYYY-MM-DD HH:mm:ss');
                const saveToken = await refresh.saveRefresh(admin_id, refreshToken, createdAt, expiryAt);
                // res.cookie('refreshJwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
                res.cookie('refreshJwt', refreshToken, { httpOnly: true });
                if (saveToken) {
                    res.status(200).json({ status: true, accessToken: accessToken, message: response.message });
                }
                else {
                    res.status(200).json({ status: false, message: "Something Went Wrong" });
                }
            }
            else {
                res.status(200).json({ status: false, message: response.message });
            }
        }
        else {
            res.status(200).json({ status: false, message: response.error });
        }
    }
    else if (!flag) {
        res.status(200).json({ status: false, message: error });
    }
}

exports.logout = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.refreshJwt) {
        res.status(200).json({ status: false, message: "No Cookie Found" });
    }
    else {
        const refreshToken = cookies.refreshJwt;
        const findRefresh = await refresh.checkRefresh(refreshToken);
        if (!findRefresh) {
            // res.clearCookie('refreshJwt', { httpOnly: true,sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
            res.clearCookie('refreshJwt', { httpOnly: true });
            res.status(200).json({ status: true, message: "Admin Logged Out" });
        }
        else if (findRefresh) {
            const deleteToken = await refresh.deleteRefresh(refreshToken);
            // res.clearCookie('refreshJwt', { httpOnly: true,sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
            res.clearCookie('refreshJwt', { httpOnly: true });
            res.status(200).json({ status: true, message: "Admin Logged Out" });
        }
    }
}
