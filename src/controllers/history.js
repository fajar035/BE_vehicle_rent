const historyModel = require("../models/history")

// get all history
const getAllHistory = (req, res) => {
  const { query } = req
  let keyword = `%%`
  if (query.cari) keyword = `'%${query.cari}%'`
  historyModel
    .getAllHistory(keyword, query)
    .then(({ status, result }) => {
      return res.status(status).json({ result })
    })
    .catch(({ status, err }) => {
      res
        .status(status)
        .json({ message: "An error occurred on the server", err })
    })
}

// get history by id
const gethistoryById = (req, res) => {
  const { params } = req
  const id = params.id
  historyModel
    .gethistoryById(id)
    .then(({ status, result }) => {
      return res.status(status).json(result)
    })
    .catch(({ status, err }) => {
      res.status(status).json({
        message: "An error occureed on the server",
        err
      })
    })
}

// new history
const newHistory = (req, res) => {
  const { body } = req
  historyModel
    .newHistory(body)
    .then(({ status, result }) => {
      console.log(result)
      res.status(status).json({ result })
    })
    .catch(({ status, err }) => {
      res
        .status(status)
        .json({ message: "An error occurred on the server", err })
    })
}

// delete history
const deleteHistory = (req, res) => {
  const { params } = req
  const id = params.id
  historyModel
    .deleteHistory(id)
    .then(({ status, result }) => {
      if (status === 404)
        return res.status(status).json({ id: id, message: "Data not found" })
      return res
        .status(status)
        .json({ id: id, message: "History deleted successfuly" })
    })
    .catch(({ status, err }) => {
      res
        .status(status)
        .json({ message: "An error occurred on the server", err })
    })
}

// popular vehicles
const popular = (req, res) => {
  historyModel
    .popular()
    .then(({ status, result }) => {
      return res.status(status).json({ popular: result })
    })
    .catch(({ status, err }) => {
      return res.status(status).json({
        message: "An error occurred on the server",
        err
      })
    })
}

module.exports = {
  getAllHistory,
  newHistory,
  deleteHistory,
  gethistoryById,
  popular
}
