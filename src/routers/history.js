const express = require("express");
const historyController = require("../controllers/history");
const { checkToken } = require("../middleware/authorize");
const historyRouter = express.Router();

// get all data
historyRouter.get("/", checkToken, historyController.getAllHistory);

// get data by id
historyRouter.get("/:id", historyController.getHistoryById);

// new data history
historyRouter.post("/", checkToken, historyController.newHistory);

// delete data by id
historyRouter.delete("/:id", checkToken, historyController.deleteHistory);

// popular vehicles
historyRouter.get("/popular", historyController.popular);

historyRouter.patch("/:id", checkToken, historyController.updateHistory);

module.exports = historyRouter;
