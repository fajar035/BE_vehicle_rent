require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const mainRouter = require("./src/routers/mainRouter")
const cors = require("cors")

const server = express()
const logger = morgan(
  ":method : url :status :res[content-length] - :response-time ms"
)

const host = "http://localhost:"
const port = 8000

const corsOptions = {
  origin: "*",
  allowedHeaders: "x-access-token",
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"]
}

server.use(cors(corsOptions))
server.use(express.urlencoded({ extended: true }))
server.use(express.json())
server.use(logger)
server.use(mainRouter)
server.use(express.static("public/tmp"))

server.listen(port, (req, res) => {
  console.log(`Server Running at ${host}${port}`)
})
