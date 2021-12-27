const express = require("express")
const usersControllers = require("../controllers/users")
const { checkToken } = require("../middleware/authorize")
const usersRouter = express.Router()
const upload = require("../middleware/upload")

// const token = require("../middleware/validate")

usersRouter.get("/", checkToken, usersControllers.getAllProfile)
usersRouter.get("/id/:id", usersControllers.getProfileById)
usersRouter.get("/photo", checkToken, usersControllers.getPhoto)

usersRouter.post("/", usersControllers.addProfile)
usersRouter.post(
  "/upload",
  checkToken,
  upload.single("user"),
  usersControllers.uploadPhoto
)
usersRouter.put("/", checkToken, usersControllers.editProfile)
usersRouter.delete("/", usersControllers.deleteProfile)

module.exports = usersRouter

// mainRouter.post("/upload", upload.single("profile"), (req, res) => {
//   res.status(200).json({message: "Upload Berhasil", url: req.file})
// })
