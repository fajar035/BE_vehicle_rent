const express = require("express")
const profileController = require("../controllers/profile")
const profileRouter = express.Router()

// get all data
profileRouter.get("/", profileController.getAllProfile)

// get data by id
profileRouter.get("/:id", profileController.getProfileById)

// new data users
profileRouter.post("/", profileController.addProfile)

// edit all data users
profileRouter.put("/:id", profileController.editProfile)

// delete data by id
profileRouter.delete("/:id", profileController.deleteProfile)

module.exports = profileRouter
