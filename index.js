require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const mainRouter = require("./src/routers/mainRouter");
const cors = require("cors");
const path = require("path");

const server = express();
const logger = morgan(
  ":method : url :status :res[content-length] - :response-time ms"
);

const host = "http://localhost:";
const port = process.env.PORT || 8000;

const corsOptions = {
  origin: [process.env.HOSTBACKEND, "https://vehicle-react.netlify.app", "*"],
  allowedHeaders: ["x-access-token", "content-type"],
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"]
};

server.use(cors(corsOptions));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(logger);
server.use(mainRouter);
server.use("/users/photo", express.static(path.join(__dirname, "public/tmp")));
server.use(
  "/vehicles/photo",
  express.static(path.join(__dirname, "public/tmp"))
);

// server.use(express.static("public/tmp"))

server.listen(port, (req, res) => {
  console.log(`Server Running at ${host}${port}`);
});
