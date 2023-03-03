const express = require('express');
const clientRouter = express.Router();
const client = require("../controller/clientController");
const bill = require("../controller/billController");
const authToken = require("../middleware/auth");

clientRouter.post("/register-client", authToken, client.register);

clientRouter.get("/getAll-client", authToken, client.getAll);

clientRouter.get("/getOne-client/:blp_id", authToken, client.getOne);

clientRouter.put("/update-client/:blp_id", authToken, client.update);

clientRouter.put("/update-billstatus/:blp_id", authToken, client.billStatus);

clientRouter.put("/update-workstatus/:blp_id", authToken, client.workStatus);

clientRouter.post("/upload-bill/:blp_id", authToken, bill.upload);

clientRouter.get("/get-bill/:blp_id", authToken, bill.get);

module.exports = clientRouter;