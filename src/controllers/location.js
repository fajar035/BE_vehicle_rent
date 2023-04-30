const locationModel = require("../models/location");
const resHelper = require("../helpers/response");

const getLocation = (req, res) => {
  locationModel
    .getLocation()
    .then(({ status, result }) => {
      return resHelper.success(res, status, { result });
    })
    .catch((status, err) => {
      return resHelper.fail(res, status, { err });
    });
};

module.exports = { getLocation };
