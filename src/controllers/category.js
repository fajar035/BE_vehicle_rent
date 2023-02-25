const categoryModel = require("../models/category");
const resHelper = require("../helpers/response");

const getCategory = (req, res) => {
  categoryModel
    .getCategory()
    .then(({ status, result }) => {
      return resHelper.success(res, status, { result: result });
    })
    .catch(({ status, err }) => {
      return resHelper.fail(res, status, err);
    });
};

const newCategory = (req, res) => {
  const { body } = req;
  categoryModel
    .newCategory(body)
    .then(({ status, result }) => {
      return resHelper.success(res, status, { result: result });
    })
    .catch(({ status, err }) => {
      return resHelper.fail(res, status, err);
    });
};

const deleteCategory = (req, res) => {
  const { params } = req;
  const id = params.id;
  categoryModel
    .deleteCategory(id)
    .then(({ status, result }) => {
      console.log("STATUS-THEN", status);
      console.log("RESULT-THEN", result);
      return resHelper.success(res, status, result);
    })
    .catch(({ status, err }) => {
      console.log("STATUS-CATCH", status);
      console.log("ERR-CATCH", err);
      return resHelper.fail(res, status, err);
    });
};

module.exports = { getCategory, newCategory, deleteCategory };
