const express = require('express');
const adminRouter = express.Router();
const admin = require("../controller/adminController");
const client = require("../controller/clientController");
const authToken = require("../middleware/auth");

adminRouter.post("/signup", admin.signup);

adminRouter.post("/login", admin.login);

adminRouter.post("/logout", admin.logout);

adminRouter.post("/register-client",authToken, client.register);

adminRouter.get("/getAll-client",authToken, client.getAll);

module.exports = adminRouter;
