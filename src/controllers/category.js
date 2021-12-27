const categoryModel = require("../models/category")
const resHelper = require("../helpers/response")

const getCategory = (req, res) => {
  categoryModel
    .getCategory()
    .then(({ status, result }) => {
      return resHelper.success(res, status, { result: result })
    })
    .catch(({ status, err }) => {
      return resHelper.fail(res, status, err)
    })
}

module.exports = { getCategory }
