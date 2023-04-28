const path = require("path");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "vehicle_rental_api/users",
    format: async (req, file) => "jpg", // supports promises as well
    public_id: (req, file) => {
      const { email } = req.userInfo;
      const nameEmail = email.replace(/@.*$/, "");
      const format = `${file.fieldname}-${nameEmail}${path.extname(
        file.originalname
      )}`;
      return format;
    },
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

const upload = multer({ storage, multerOptions }).single("photoUser");

const multerHandler = (req, res, next) => {
  const { baseUrl } = req;
  if (baseUrl === "/users") {
    upload(req, res, (err) => {
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
