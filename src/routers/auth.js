const express = require("express")
const authController = require("../controllers/auth")
const { checkToken } = require("../middleware/authorize")
const authRouter = express.Router()

authRouter.post("/register", authController.register)
authRouter.post("/login", authController.login)

authRouter.delete("/logout", checkToken, authController.logout)

module.exports = authRouter
