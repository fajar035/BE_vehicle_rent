const express = require("express")
const vehicleController = require("../controllers/vehicle")
const vehicleRouter = express.Router()

// get all data vehicle
vehicleRouter.get("/", vehicleController.getAllvehicle)

// get data by id
vehicleRouter.get("/:id", vehicleController.getVehicleById)

// new data vehicle
vehicleRouter.post("/newVehicle", vehicleController.newVehicle)

// edit all data vehicle
vehicleRouter.put("/:id", vehicleController.editVehicle)

// delete data by id
vehicleRouter.delete("/:id", vehicleController.deleteVehicle)
