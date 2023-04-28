const multer = require("multer");
const path = require("path");
const cloudinary = require("../configs/cloudinaryConfigs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/tmp");
  },
  filename: (req, file, cb) => {
    const format = `${file.fieldname}-${Math.random()}${path.extname(
      file.originalname
    )}`;
    cb(null, format);
  },
});

const multerOptions = {
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/webp"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      const err = new Error("Only .png, .jpg and .jpeg format allowed!");
      err.name = "ExtensionError";
      return cb(err);
    }
  },
};

const upload = multer(multerOptions).single("photoUser");

const multi_upload = multer(multerOptions).array("uploadPhotoVehicle", 3);

const multerHandler = (req, res, next) => {
  const { baseUrl } = req;
  if (baseUrl === "/users") {
    upload(req, res, (err) => {
      const { destination, filename } = req.file;
      if (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).json({
            errMsg: `Image size mustn't be bigger than 2MB!`,
            err: err.code,
          });
        }
        if (err.code === "WRONG_EXSTENSION") {
          return res.status(400).json({
            errMsg: `Only .png, .jpg and .jpeg format allowed!`,
            err: err.code,
          });
        }
        return res.status(500).json({
          errMsg: `Something went wrong.`,
          err,
        });
      }
      const file = destination + "/" + filename;

      cloudinary.uploader.upload(file).then((res) => {
        const { url } = res;
        req.urlPhoto = url;
        next();
      });
    });
  } else if (baseUrl === "/vehicles") {
    multi_upload(req, res, (err) => {
      if (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).json({
            errMsg: `Image size mustn't be bigger than 2MB!`,
            err: err.code,
          });
        }
        if (err.code === "WRONG_EXSTENSION") {
          return res.status(400).json({
            errMsg: `Only .png, .jpg and .jpeg format allowed!`,
            err: err.code,
          });
        }
        return res.status(500).json({
          errMsg: `Something went wrong.`,
          err,
        });
      }

      next();
    });
  }
};

module.exports = multerHandler;
