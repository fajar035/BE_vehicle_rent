const express = require("express")
const mainRouter = express.Router()

const profileRouter = require("./profile")
const vehicleRouter = require("./vehicle")
const historyRouter = require("./history")

mainRouter.use("/profile", profileRouter)
mainRouter.use("/vehicles", vehicleRouter)
mainRouter.use("/history", historyRouter)

mainRouter.get("/", (req, res) => {
  res.status(200).json({ Page: "Weclome To Vehicle Rent" })
})

module.exports = mainRouter
