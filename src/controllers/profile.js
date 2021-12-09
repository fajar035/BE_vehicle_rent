const profileModel = require("../models/profile")

// get all profile
const getAllProfile = (req, res) => {
  const { query } = req
  profileModel
    .getAllProfile(query)
    .then(({ status, result }) => {
      return res.status(status).json({ result: result })
    })
    .catch(({ status, result }) => {
      res.status(status).json({ message: "An error occurred on the server" })
    })
}

// get profile by id
const getProfileById = (req, res) => {
  const { params } = req
  const id = params.id
  profileModel
    .getProfileById(id)
    .then(({ status, result }) => {
      if (status === 404)
        return res.status(status).json({ message: "User not found", result })
      return res.status(status).json({ result })
    })
    .catch(({ status, err }) => {
      res
        .status(status)
        .json({ message: "An error occurred on the server", err })
    })
}

// add new profile
const addProfile = (req, res) => {
  const { body } = req
  profileModel
    .addProfile(body)
    .then(({ status, result }) => {
      res.status(status).json({
        message: "Add new profile successfuly",
        result
      })
    })
    .catch(({ status, result }) => {
      res.status(status).json({ message: "An error occurred on the server" })
    })
}

// edit profile
const editProfile = (req, res) => {
  const { body, params } = req
  const id = params.id
  profileModel
    .editProfile(id, body)
    .then(({ status, result }) => {
      // console.log(status, result)
      res.status(status).json({ message: "Edit Profile successfuly" })
    })
    .catch(({ status, result, message }) => {
      res.status(status).json({ status, message, example_date: "DD-MM-YYYY" })
    })
}

// delete profile
const deleteProfile = (req, res) => {
  const { params } = req
  const id = params.id
  profileModel
    .deleteProfile(id)
    .then(({ status, result }) => {
      if (status === 404)
        return res.status(status).json({ id: id, message: "User not found" })
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

module.exports = {
  getAllProfile,
  getProfileById,
  addProfile,
  editProfile,
  deleteProfile
}
