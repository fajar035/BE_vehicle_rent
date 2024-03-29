const historyModel = require("../models/history");
const resHelper = require("../helpers/response");

// get all history
const getAllHistory = (req, res) => {
  const { query } = req;
  let keyword = `%%`;
  if (query.search) keyword = `'%${query.search}%'`;
  historyModel
    .getAllHistory(keyword, query)
    .then(({ status, result, meta }) => {
      return resHelper.success(res, status, { result, meta });
    })
    .catch(({ status, err }) => {
      // console.log(status);
      return resHelper.fail(res, status, { err });
    });
};

// new history
const newHistory = (req, res) => {
  const { body } = req;
  historyModel
    .newHistory(body)
    .then(({ status, result }) => {
      resHelper.success(res, status, { result });
    })
    .catch(({ status, err }) => {
      resHelper.fail(res, status, { err });
    });
};

// delete history
const deleteHistory = (req, res) => {
  const { params } = req;
  const id = params.id;
  historyModel
    .deleteHistory(id)
    .then(({ status, result }) => {
      resHelper.success(res, status, { result });
    })
    .catch(({ status, err }) => {
      resHelper.fail(res, status, { err });
    });
};

// popular vehicles
const popular = (req, res) => {
  const { query } = req;

  historyModel
    .popular(query)
    .then(({ status, result, meta }) => {
      return resHelper.success(res, status, { result, meta });
    })
    .catch(({ status, err }) => {
      return res.status(status).json({
        message: "An error occurred on the server",
        err,
      });
    });
};

// history by id
const getHistoryById = (req, res) => {
  const { params } = req;
  const id = params.id;
  historyModel
    .getHistoryById(id)
    .then(({ status, result }) => {
      return resHelper.success(res, status, { result });
    })
    .catch(({ status, err }) => {
      return resHelper.fail(res, status, { err });
    });
};

const updateHistory = (req, res) => {
  const { body, params } = req;
  const id = parseInt(params.id);
  const rating = body.rating;
  const url = req.originalUrl;

  if (isNaN(id))
    return resHelper.fail(res, 403, {
      result: { url, message: "ID params must be number" },
    });
  historyModel
    .updateRating(id, rating)
    .then(({ status, result }) => {
      return resHelper.success(res, status, { result });
    })
    .catch(({ status, err }) => {
      return resHelper.fail(res, status, { err });
    });
};

module.exports = {
  getAllHistory,
  newHistory,
  deleteHistory,
  getHistoryById,
  popular,
  updateHistory,
};
