const express = require("express");
const mainRouter = express.Router();

const usersRouter = require("./users");
const vehicleRouter = require("./vehicle");
const historyRouter = require("./history");
const authRouter = require("./auth");
const categoryRouter = require("./category");
const locationRouter = require("./location");
const statusRouter = require("./status");

mainRouter.use("/users", usersRouter);
mainRouter.use("/vehicles", vehicleRouter);
mainRouter.use("/history", historyRouter);
mainRouter.use("/auth", authRouter);
mainRouter.use("/category", categoryRouter);
mainRouter.use("/status", statusRouter);
mainRouter.use("/location", locationRouter);

mainRouter.get("/", (req, res) => {
  res.status(200).json({ Page: "Weclome To Vehicle Rent" });
});

module.exports = mainRouter;
