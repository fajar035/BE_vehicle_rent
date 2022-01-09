const express = require("express")
const vehicleController = require("../controllers/vehicle")
const vehicleRouter = express.Router()

vehicleRouter.get("/", vehicleController.getAllVehicle)
vehicleRouter.get("/:id", vehicleController.getVehicleById)

vehicleRouter.post("/", vehicleController.addVehicle)
vehicleRouter.put("/:id", vehicleController.editVehicle)
vehicleRouter.delete("/:id", vehicleController.deleteVehicle)
vehicleRouter.get("/location/:id", vehicleController.getLocation)

module.exports = vehicleRouter
