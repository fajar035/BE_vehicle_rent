const express = require("express")
const statusControllers = require("../controllers/status")
const statusRouter = express.Router()

statusRouter.get("/", statusControllers.getStatus)

module.exports = statusRouter
