const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/tmp");
  },
  filename: (req, file, cb) => {
    // const { id } = req.params
    // console.log(file)
    const format = `${file.fieldname}-${Math.random()}${path.extname(
      file.originalname
    )}`;
    // console.log(format)
    cb(null, format);
  }
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
      const err = new Error(
        "Only .png, .jpg and .jpeg format allowed!"
      );
      err.name = "ExtensionError";
      return cb(err);
    }
  }
};

const multi_upload = multer(multerOptions).array(
  "uploadPhotoVehicle",
  3
);

const multerHandler = (req, res, next) => {
  multi_upload(req, res, (err) => {
    console.log(err);
    if (err) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          errMsg: `Image size mustn't be bigger than 2MB!`,
          err: err.code
        });
      }
      if (err.code === "WRONG_EXSTENSION") {
        return res.status(400).json({
          errMsg: `Only .png, .jpg and .jpeg format allowed!`,
          err: err.code
        });
      }
      return res.status(500).json({
        errMsg: `Something went wrong.`,
        err
      });
    }

    next();
  });
};

// const uploadMulti = { multi_upload }
// const multerOptions = { storage }
// module.exports = multer(multerOptions)
// module.exports = multer(uploadMulti)

module.exports = multerHandler;
