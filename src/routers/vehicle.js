const express = require("express");
const vehicleController = require("../controllers/vehicle");
const { checkToken } = require("../middleware/authorize");
const vehicleRouter = express.Router();
const uploadVehicle = require("../middleware/uploadVehicle");
const { getVehicle } = require("../middleware/vehicles");

vehicleRouter.get("/", vehicleController.getAllVehicle);

vehicleRouter.get("/:id", vehicleController.getVehicleById);

vehicleRouter.post(
  "/",
  checkToken,
  uploadVehicle,
  vehicleController.addVehicle
);

vehicleRouter.patch(
  "/:id",
  checkToken,
  uploadVehicle,
  getVehicle,
  vehicleController.editVehicle
);

vehicleRouter.delete("/:id", checkToken, vehicleController.deleteVehicle);

// vehicleRouter.get("/location", vehicleController.getLocation)

vehicleRouter.get("/photoVehicle", vehicleController.getPhotoVehicle);

vehicleRouter.post(
  "/upload/:id",
  checkToken,
  uploadVehicle,
  vehicleController.uploadPhotoVehicle
);

vehicleRouter.patch(
  "/softDelete/:id",
  checkToken,
  vehicleController.softDeleteVehicle
);

module.exports = vehicleRouter;
