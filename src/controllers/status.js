const statusModel = require("../models/status")
const resHelper = require("../helpers/response")

const getStatus = (req, res) => {
  statusModel
    .getStatus()
    .then(({ status, result }) => {
      resHelper.success(res, status, { result })
    })
    .catch(({ status, error }) => {
      resHelper.fail(res, status, { error })
    })
}

module.exports = { getStatus }
