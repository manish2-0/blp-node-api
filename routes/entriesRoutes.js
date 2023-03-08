const express = require('express');
const entriesRouter = express.Router();
const entries = require("../controller/entriesController");
const authToken = require("../middleware/auth");

entriesRouter.post("/register-entries", authToken, entries.register);

entriesRouter.get("/getAll-entries", authToken, entries.getAll);

entriesRouter.get("/getOne-entries/:blp_id", authToken, entries.getOne);

entriesRouter.put("/update-entries/:sr_no", authToken, entries.update);

entriesRouter.delete("/delete-entries/:sr_no", authToken, entries.delete);

entriesRouter.post("/generate-report", authToken, entries.generateReport)

module.exports = entriesRouter;