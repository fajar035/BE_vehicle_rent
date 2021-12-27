const express = require("express")
const authController = require("../controllers/auth")
const authRouter = express.Router()

authRouter.post("/register", authController.register)
authRouter.post("/login", authController.login)

// delete data by id
// authRouter.delete("/:id", authController.deleteHistory)

module.exports = authRouter
