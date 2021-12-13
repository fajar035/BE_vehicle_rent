require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const mainRouter = require("./src/routers/mainRouter")

const server = express()
const logger = morgan(
  ":method : url :status :res[content-length] - :response-time ms"
)

const host = "http://localhost:"
const port = 8000


server.use(express.urlencoded({ extended: true }))
server.use(express.json());
server.use(logger)
server.use(mainRouter)
server.use(express.static("public/tmp"))



server.listen(port, (req, res) => {
  console.log(`Server Running at ${host}${port}`)
})