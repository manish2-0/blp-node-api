const express = require('express');
const adminRouter = express.Router();
const admin = require("../controller/adminController");
const authToken = require("../middleware/auth");

adminRouter.post("/signup", admin.signup);

adminRouter.post("/login", admin.login);

adminRouter.post("/logout", admin.logout);

module.exports = adminRouter;
