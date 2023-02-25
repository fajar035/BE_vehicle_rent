const express = require("express");
const { checkToken } = require("../middleware/authorize");
const categoryController = require("../controllers/category");
const categoryRouter = express.Router();

categoryRouter.get("/", categoryController.getCategory);
categoryRouter.post("/", checkToken, categoryController.newCategory);
categoryRouter.delete("/:id", checkToken, categoryController.deleteCategory);

module.exports = categoryRouter;
