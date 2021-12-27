const vehicleModel = require("../models/vehicle")
const resHelper = require("../helpers/response")

const checkCategory = (req, res, next) => {
  const {
    body: { category }
  } = req

  vehicleModel
    .checkCategory(category)
    .then(({ status, result }) => {
      console.log(category)
      console.log(status, result)
      if (typeof result == "undefined")
        return resHelper.success(res, status, {
          message: "category cannot be empty"
        })

      next()
    })
    .catch((err) => {
      console.log(err)
      return resHelper.fail(res, 500, {
        message: "An error occured on the server",
        err
      })
    })
}

module.exports = { checkCategory }
