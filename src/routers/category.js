const express = require("express")
const categoryController = require("../controllers/category")
const categoryRouter = express.Router()

categoryRouter.get("/", categoryController.getCategory)

module.exports = categoryRouter
