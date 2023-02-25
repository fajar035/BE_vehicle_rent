const locationModel = require("../models/location")
const resHelper = require("../helpers/response")

const getLocation = (req, res) => {
  locationModel
    .getLocation()
    .then(({ status, result }) => {
      console.log(status)
      return resHelper.success(res, status, { result })
    })
    .catch((status, err) => {
      console.log(status)
      return resHelper.fail(res, status, { err })
    })
}

module.exports = { getLocation }
