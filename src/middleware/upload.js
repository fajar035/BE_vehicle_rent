const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../tmp") )
  },
  filename: (req, file, cb) => {
    const format = `${file.fieldname}-${Math.random()}${path.extname(
      file.originalname
    )}`
    cb(null, format)
  }
})

const multerOptions = { storage }
module.exports = multer(multerOptions)
