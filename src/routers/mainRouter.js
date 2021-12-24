const express = require("express")
const mainRouter = express.Router()

const usersRouter = require("./users")
const vehicleRouter = require("./vehicle")
const historyRouter = require("./history")
const authRouter = require("./auth")

const upload = require("../middleware/upload")

mainRouter.use("/users", usersRouter)
mainRouter.use("/vehicles", vehicleRouter)
mainRouter.use("/history", historyRouter)
mainRouter.use("/auth", authRouter)

mainRouter.get("/", (req, res) => {
  res.status(200).json({ Page: "Weclome To Vehicle Rent" })
})

mainRouter.post("/upload", upload.single("profile"), (req, res) => {
  res.status(200).json({ message: "Upload Berhasil", url: req.file })
})

module.exports = mainRouter
