const usersModel = require("../models/users")
const resHelper = require("../helpers/response")

// get all profile
const getAllProfile = (req, res) => {
  const { query, userInfo } = req
  let keyword = `%%`

  if (query.cari) keyword = `'%${query.cari}%'`
  usersModel
    .getAllProfile(keyword, query, userInfo)
    .then(({ status, result, meta }) => {
      return resHelper.success(res, status, { result, meta })
    })
    .catch(({ status, err }) => {
      return resHelper.fail(res, status, { err })
    })
}

// get profile by id
const getProfileById = (req, res) => {
  const { userInfo } = req
  const id = userInfo.id
  usersModel
    .getProfileById(id)
    .then(({ status, result }) => {
      const { id, name, email, dob, nohp, address, photo } = result[0]
      const d = new Date(dob)
      const birtday = `${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`

      if (status === 404)
        return resHelper.success(res, status, {
          message: "User not found"
        })
      return resHelper.success(res, status, {
        result: {
          id,
          name,
          email,
          birtday: birtday,
          phone: nohp,
          address,
          photo
        }
      })
    })
    .catch(({ status, err }) => {
      return resHelper.fail(res, status, {
        message: "An error occurred on the server",
        err
      })
    })
}

// add new profile
const addProfile = (req, res) => {
  const { body } = req
  usersModel
    .addProfile(body)
    .then(({ status, result }) => {
      if (status == 404)
        return res
          .status(status)
          .json({ message: "data cannot be empty", result })

      res.status(status).json({
        message: "Add new profile successfuly",
        result
      })
      // const {name, gender, phoneNumber, dateOfBirth, address, photo} = result
      // cek data jika tidak ada
    })
    .catch(({ status, err }) => {
      res
        .status(status)
        .json({ message: "An error occurred on the server", err })
    })
}

// edit profile
const editProfile = (req, res) => {
  const { body, userInfo } = req
  const { id } = userInfo
  usersModel
    .editProfile(body, userInfo)
    .then(({ status, result }) => {
      const { name, gender, dob, nohp, address } = body
      const { id } = userInfo
      if (status === 404)
        resHelper.success(res, status, {
          result: {
            id: id,
            status: status,
            message: "User not found"
          }
        })
      resHelper.success(res, status, {
        result: {
          id,
          name,
          gender,
          birtday: dob,
          phone: nohp,
          address
        }
      })
    })
    .catch(({ status, err, message }) => {
      return resHelper.fail(res, status, {
        id: id,
        message,
        example_date: "DD-MM-YYYY",
        err
      })
    })
}

// delete profile
const deleteProfile = (req, res) => {
  const { query, userInfo } = req
  const id = query.id
  // console.log(req)
  usersModel
    .deleteProfile(id, userInfo)
    .then(({ status, result }) => {
      if (status === 404)
        return resHelper.success(res, status, {
          id: id,
          message: "User not found"
        })
      return resHelper.success(res, status, {
        id: id,
        message: "Data deleted successfully"
      })
    })
    .catch(({ status, err }) => {
      return resHelper.fail(res, status, {
        message: "An error occurred on the server",
        err
      })
    })
}

// upload photo
const uploadPhoto = (req, res) => {
  // res.status(200).json({message: "Upload Berhasil", url: req.file})
  const { userInfo } = req
  // const { id } = body
  const { file } = req
  // console.log(file)

  const fileName = file.filename
  usersModel
    .uploadPhoto(fileName, userInfo)
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

const getPhoto = (req, res) => {
  const { userInfo } = req

  usersModel
    .getPhoto(userInfo)
    .then(({ status, result }) => {
      return resHelper.success(res, status, result)
    })
    .catch(({ status, err }) => {
      return resHelper.fail(res, status, {
        message: "An error occurred on the server",
        err
      })
    })
}

module.exports = {
  getAllProfile,
  getProfileById,
  addProfile,
  editProfile,
  deleteProfile,
  uploadPhoto,
  getPhoto
}
