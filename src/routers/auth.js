const express = require("express")
const authController = require("../controllers/auth")
const authRouter = express.Router()
// const middleware = require("../middleware/validate")

// register
authRouter.post("/register", authController.register)

// login
authRouter.post("/login", authController.login)

// delete data by id
// authRouter.delete("/:id", authController.deleteHistory)

module.exports = authRouter
