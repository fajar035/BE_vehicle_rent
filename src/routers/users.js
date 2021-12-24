const express = require("express")
const usersControllers = require("../controllers/users")
const usersRouter = express.Router()
const upload = require("../middleware/upload")

// const token = require("../middleware/validate")

usersRouter.get("/", usersControllers.getAllProfile)
usersRouter.get("/:id", usersControllers.getProfileById)
usersRouter.post("/", usersControllers.addProfile)
usersRouter.put("/:id", usersControllers.editProfile)
usersRouter.delete("/:id", usersControllers.deleteProfile)
usersRouter.post("/upload", upload.single("user"), usersControllers.uploadPhoto)
usersRouter.get("/photo")

module.exports = usersRouter

// mainRouter.post("/upload", upload.single("profile"), (req, res) => {
//   res.status(200).json({message: "Upload Berhasil", url: req.file})
// })
