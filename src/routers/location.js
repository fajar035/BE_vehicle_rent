const express = require("express")
const locationController = require("../controllers/location")
const locationRouter = express.Router()

locationRouter.get("/", locationController.getLocation)

module.exports = locationRouter
