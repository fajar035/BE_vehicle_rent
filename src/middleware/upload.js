const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/tmp")
  },
  filename: (req, file, cb) => {
    const { userInfo } = req
    const { id } = userInfo
    const format = `${file.fieldname}-${id}${path.extname(file.originalname)}`
    cb(null, format)
  }
})

const multerOptions = { storage }
module.exports = multer(multerOptions)
