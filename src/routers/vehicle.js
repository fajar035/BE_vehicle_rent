const express = require("express")
const vehicleController = require("../controllers/vehicle")
const { checkToken } = require("../middleware/authorize")
const vehicleRouter = express.Router()
const uploadVehicle = require("../middleware/uploadVehicle")

vehicleRouter.get("/", vehicleController.getAllVehicle)

vehicleRouter.get("/:id", vehicleController.getVehicleById)

vehicleRouter.post("/", checkToken, uploadVehicle, vehicleController.addVehicle)

vehicleRouter.patch(
  "/:id",
  checkToken,
  uploadVehicle,
  vehicleController.editVehicle
)

vehicleRouter.delete("/:id", vehicleController.deleteVehicle)

vehicleRouter.get("/location/:id", vehicleController.getLocation)

vehicleRouter.get("/photoVehicle", vehicleController.getPhotoVehicle)

vehicleRouter.post(
  "/upload/:id",
  checkToken,
  uploadVehicle,
  vehicleController.uploadPhotoVehicle
)

module.exports = vehicleRouter
