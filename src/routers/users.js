const express = require("express")
const usersControllers = require("../controllers/users")
const { checkToken } = require("../middleware/authorize")
const usersRouter = express.Router()
const upload = require("../middleware/upload")
const getUser = require("../middleware/user")

usersRouter.get("/", checkToken, usersControllers.getAllProfile)
usersRouter.get("/:id", checkToken, usersControllers.getProfileById)
usersRouter.get("/photo", checkToken, usersControllers.getPhoto)

// usersRouter.post("/", checkToken, usersControllers.addProfile)

usersRouter.post(
  "/upload",
  checkToken,
  upload.single("user"),
  usersControllers.uploadPhoto
)

usersRouter.patch(
  "/",
  checkToken,
  upload.single("photoUser"),
  getUser.getUser,
  usersControllers.editProfile
)

usersRouter.delete("/", checkToken, usersControllers.deleteProfile)

module.exports = usersRouter
