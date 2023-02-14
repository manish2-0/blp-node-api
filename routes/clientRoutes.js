const express = require('express');
const clientRouter = express.Router();
const client = require("../controller/clientController");
const authToken = require("../middleware/auth");

clientRouter.post("/register-client",authToken, client.register);

clientRouter.get("/getAll-client",authToken, client.getAll);

module.exports = clientRouter;