const express = require("express")
const mainRouter = express.Router()

const profileRouter = require("./profile")
const vehiclesRouter = require("./vehicle")

mainRouter.use("/profile", profileRouter)
mainRouter.use("/vehicle", vehicleRouter)

mainRouter.get("/", (req, res) => {
  res.status(200).json({ Page: "Weclome To Vehicle Rent" })
})

module.exports = mainRouter
