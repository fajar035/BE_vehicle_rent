const express = require("express")
const usersControllers = require("../controllers/users")
const { checkToken } = require("../middleware/authorize")
const usersRouter = express.Router()
const upload = require("../middleware/upload")

// const token = require("../middleware/validate")

usersRouter.get("/", checkToken, usersControllers.getAllProfile)
usersRouter.get("/:id", usersControllers.getProfileById)
usersRouter.post("/", usersControllers.addProfile)
usersRouter.put("/", checkToken, usersControllers.editProfile)
usersRouter.delete("/", usersControllers.deleteProfile)
usersRouter.post(
  "/upload",
  checkToken,
  upload.single("user"),
  usersControllers.uploadPhoto
)
usersRouter.get("/photo")

module.exports = usersRouter

// mainRouter.post("/upload", upload.single("profile"), (req, res) => {
//   res.status(200).json({message: "Upload Berhasil", url: req.file})
// })
