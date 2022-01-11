const vehicleModel = require("../models/vehicle")
const resHelper = require("../helpers/response")

const getAllVehicle = (req, res) => {
  const { query } = req
  let keyword = `%%`
  let keywordFilter = ``

  if (query.cari) keyword = `'%${query.cari}%'`
  if (query.filter) keywordFilter = `'${query.filter}'`
  vehicleModel
    .getAllVehicle(keyword, query, keywordFilter)
    .then(({ status, result, meta }) => {
      return resHelper.success(res, status, { result, meta })
    })
    .catch(({ status, err }) => {
      return resHelper.fail(res, status, { err })
    })
}

const getVehicleById = (req, res) => {
  const { params } = req
  const id = params.id
  vehicleModel
    .getVehicleById(id)
    .then(({ status, result }) => {
      return resHelper.success(res, status, { result })
    })
    .catch(({ status, err }) => {
      return resHelper.fail(res, status, { err })
    })
}

const addVehicle = (req, res) => {
  const { body } = req
  console.log(body)

  vehicleModel
    .addVehicle(body)
    .then(({ status, result }) => {
      res
        .status(status)
        .json({ message: "Add new vehicle successfuly", result })
    })
    .catch(({ status, err }) => {
      res
        .status(status)
        .json({ message: "An error occurred on the server", err })
    })
}

const editVehicle = (req, res) => {
  const { body, params } = req
  const id = params.id

  vehicleModel
    .editVehicle(id, body)
    .then(({ status, result, message }) => {
      res.status(status).json({
        message,
        result
      })
    })
    .catch(({ status, message }) => {
      res.status(status).json({ status, message })
    })
}

const deleteVehicle = (req, res) => {
  const { params } = req
  const id = params.id
  vehicleModel
    .deleteVehicle(id)
    .then(({ status, result }) => {
      if (status === 404)
        return res
          .status(status)
          .json({ id: id, message: "Data Vehicle not found" })
      return res
        .status(status)
        .json({ id: id, message: "Data deleted successfully" })
    })
    .catch(({ status, err }) => {
      res
        .status(status)
        .json({ message: "An error occurred on the server", err })
    })
}

const getLocation = (req, res) => {
  const { params } = req
  const { id } = params
  vehicleModel
    .getLocation(id)
    .then(({ status, result }) => {
      return resHelper.success(res, status, { result })
    })
    .catch((status, err) => {
      return resHelper.fail(res, status, { err })
    })
}

const uploadPhotoVehicle = (req, res) => {
  const { id } = req.params
  const { file } = req
  const fileName = file.filename
  vehicleModel
    .uploadPhotoVehicle(fileName, id)
    .then(({ status, result }) => {
      return resHelper.success(res, status, {
        message: "Upload Successfuly",
        result: result
      })
    })
    .catch(({ status, err }) => {
      return resHelper.fail(res, status, {
        message: "An error occurred on the server",
        err
      })
    })
}

const getPhotoVehicle = (req, res) => {
  const { id } = req.query

  vehicleModel
    .getPhotoVehicle(id)
    .then(({ status, result }) => {
      return resHelper.success(res, status, result)
    })
    .catch(({ status, err }) => {
      return resHelper.fail(res, status, {
        message: "An error occurred on the server"
      })
    })
}

module.exports = {
  getAllVehicle,
  getVehicleById,
  addVehicle,
  editVehicle,
  deleteVehicle,
  getLocation,
  getPhotoVehicle,
  uploadPhotoVehicle
}
