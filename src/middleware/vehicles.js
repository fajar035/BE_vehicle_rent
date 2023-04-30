const vehicleModel = require("../models/vehicle");
const resHelper = require("../helpers/response");
const db = require("../configs/db");

const checkCategory = (req, res, next) => {
  const {
    body: { category },
  } = req;

  vehicleModel
    .checkCategory(category)
    .then(({ status, result }) => {
      if (typeof result == "undefined")
        return resHelper.success(res, status, {
          message: "category cannot be empty",
        });

      next();
    })
    .catch((err) => {
      return resHelper.fail(res, 500, {
        message: "An error occured on the server",
        err,
      });
    });
};

const getVehicle = (req, res, next) => {
  const { id } = req.params;
  const sql = `SELECT * FROM vehicles WHERE id = ?`;

  db.query(sql, [id], (err, result) => {
    if (err) return resHelper.fail(res, { err });
    const getVehicleDb = result[0];
    const {
      id,
      name,
      description,
      capacity,
      price,
      stock,
      photo,
      id_category,
      id_location,
      id_status,
    } = getVehicleDb;

    const bodyOld = {
      id: id,
      nameOld: name,
      descriptionOld: description,
      capacityOld: capacity,
      priceOld: price,
      stockOld: stock,
      photoOld: photo,
      id_categoryOld: id_category,
      id_locationOld: id_location,
      id_statusOld: id_status,
    };
    req.bodyOld = bodyOld;
    next();
  });
};

module.exports = { checkCategory, getVehicle };
