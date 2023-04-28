const express = require("express");
const usersControllers = require("../controllers/users");
const { checkToken } = require("../middleware/authorize");
const usersRouter = express.Router();
const uploadNew = require("../middleware/uploadNew");
const getUser = require("../middleware/user");

usersRouter.get("/", checkToken, usersControllers.getAllProfile);
usersRouter.get("/detail", checkToken, usersControllers.getProfileById);
usersRouter.get("/photo", checkToken, usersControllers.getPhoto);

// usersRouter.post("/", checkToken, usersControllers.addProfile)

// usersRouter.post(
//   "/upload",
//   checkToken,
//   upload.single("user"),
//   usersControllers.uploadPhoto
// );

usersRouter.patch(
  "/edit",
  checkToken,
  uploadNew,
  getUser.getUser,
  usersControllers.editProfile
);

usersRouter.patch(
  "/update-password",
  checkToken,
  usersControllers.updatePassword
);

usersRouter.delete("/", checkToken, usersControllers.deleteProfile);

module.exports = usersRouter;
