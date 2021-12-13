const express = require("express")
const profileController = require("../controllers/profile")
const profileRouter = express.Router()
const upload = require("../middleware/upload")
const token = require("../middleware/validate")

// get all data
profileRouter.get("/", token.token("1"), profileController.getAllProfile)

// get data by id
profileRouter.get("/:id", profileController.getProfileById)

// new data users
profileRouter.post("/", profileController.addProfile)

// edit all data users
profileRouter.put("/:id", profileController.editProfile)

// delete data by id
profileRouter.delete("/:id", profileController.deleteProfile)

// upload
profileRouter.post(
  "/upload",
  upload.single("profile"),
  profileController.uploadPhoto
)

// view photo
profileRouter.get("/photo")

module.exports = profileRouter

// mainRouter.post("/upload", upload.single("profile"), (req, res) => {
//   res.status(200).json({message: "Upload Berhasil", url: req.file})
// })
