const express = require("express")
const usersControllers = require("../controllers/users")
const { checkToken } = require("../middleware/authorize")
const usersRouter = express.Router()
const upload = require("../middleware/upload")

usersRouter.get("/", checkToken, usersControllers.getAllProfile)
usersRouter.get("/:id", checkToken, usersControllers.getProfileById)
usersRouter.get("/photo", checkToken, usersControllers.getPhoto)

// usersRouter.post("/", usersControllers.addProfile)

usersRouter.post(
  "/upload",
  checkToken,
  upload.single("user"),
  usersControllers.uploadPhoto
)
usersRouter.put("/", checkToken, usersControllers.editProfile)
usersRouter.delete("/", checkToken, usersControllers.deleteProfile)

module.exports = usersRouter
