const express = require("express")
const vehicleController = require("../controllers/vehicle")
const vehicleRouter = express.Router()

// get all data vehicle
vehicleRouter.get("/", vehicleController.getAllVehicle)

// get data by id
vehicleRouter.get("/:id", vehicleController.getVehicleById)

// new data vehicle
vehicleRouter.post("/", vehicleController.addVehicle)

// edit all data vehicle
vehicleRouter.put("/:id", vehicleController.editVehicle)

// delete data by id
vehicleRouter.delete("/:id", vehicleController.deleteVehicle)

module.exports = vehicleRouter
