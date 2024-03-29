/* eslint-disable space-before-function-paren */
const usersModel = require("../models/users");
const resHelper = require("../helpers/response");

// get all profile
const getAllProfile = (req, res) => {
  const { query, userInfo } = req;
  let keyword = `%%`;

  if (query.search) keyword = `'%${query.search}%'`;
  usersModel
    .getAllProfile(keyword, query, userInfo)
    .then(({ status, result, meta }) => {
      return resHelper.success(res, status, { result, meta });
    })
    .catch(({ status, err }) => {
      return resHelper.fail(res, status, { err });
    });
};

// get profile by id
const getProfileById = (req, res) => {
  const { userInfo } = req;
  // console.log(userInfo)
  const id = userInfo.id;
  usersModel
    .getProfileById(id)
    .then(({ status, result }) => {
      const { id, name, gender, email, dob, nohp, address, photo, createdAt } =
        result[0];

      function formatDate(date) {
        const d = new Date(date);
        let month = "" + (d.getMonth() + 1);
        let day = "" + d.getDate();
        const year = d.getFullYear();

        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;

        return [year, month, day].join("-");
      }
      const birtday = formatDate(dob);

      if (status === 404)
        return resHelper.success(res, status, {
          message: "User not found",
        });
      return resHelper.success(res, status, {
        result: {
          id,
          name,
          gender,
          email,
          birtday,
          phone: nohp,
          address,
          photo,
          createdAt,
        },
      });
    })
    .catch(({ status, err }) => {
      return resHelper.fail(res, status, {
        message: "An error occurred on the server",
        err,
      });
    });
};

// add new profile
const addProfile = (req, res) => {
  const { body } = req;
  usersModel
    .addProfile(body)
    .then(({ status, result }) => {
      if (status == 404)
        return res
          .status(status)
          .json({ message: "data cannot be empty", result });

      res.status(status).json({
        message: "Add new profile successfuly",
        result,
      });
      // const {name, gender, phoneNumber, dateOfBirth, address, photo} = result
      // cek data jika tidak ada
    })
    .catch(({ status, err }) => {
      res
        .status(status)
        .json({ message: "An error occurred on the server", err });
    });
};

// edit profile
const editProfile = (req, res) => {
  let { body, userInfo, bodyOld, file, urlPhoto } = req;

  if (!file) {
    body = {
      ...body,
    };
  } else {
    body = {
      ...body,
      photo: urlPhoto,
    };
  }

  usersModel
    .editProfile(body, userInfo, bodyOld)
    .then(({ status, result, message }) => {
      // const { name, gender, dob, nohp, address } = body
      // console.log("BODY", body)
      const { id } = userInfo;
      if (status === 404)
        resHelper.success(res, status, {
          result: {
            id: id,
            status: status,
            message: "User not found",
          },
        });
      resHelper.success(res, status, { message, result });
    })
    .catch(({ status, err }) => {
      return resHelper.fail(res, status, { err });
    });
};

// Update Password
const updatePassword = (req, res) => {
  const { body, userInfo } = req;
  const { newPassword, oldPassword } = body;
  if (newPassword === oldPassword)
    return resHelper.fail(res, 401, {
      message: "New password cannot be the same as old password",
    });
  const { id } = userInfo;

  usersModel
    .updatePassword(oldPassword, newPassword, id)
    .then(({ status, result }) => {
      resHelper.success(res, status, {
        id: result.id,
        message: result.message,
      });
    })
    .catch(({ status, err, message }) => {
      return resHelper.fail(res, status, { message: message, err });
    });
};

// upload photo
const uploadPhoto = (req, res) => {
  // res.status(200).json({message: "Upload Berhasil", url: req.file})
  const { userInfo } = req;
  // const { id } = body
  const { file } = req;
  // console.log(file)

  const fileName = file.filename;
  usersModel
    .uploadPhoto(fileName, userInfo)
    .then(({ status, result }) => {
      return resHelper.success(res, status, {
        message: "Upload Successfuly",
        result: result,
      });
    })
    .catch(({ status, err }) => {
      return resHelper.fail(res, status, {
        message: "An error occurred on the server",
        err,
      });
    });
};

// delete profile
const deleteProfile = (req, res) => {
  const { query, userInfo } = req;
  const id = query.id;
  // console.log(req)
  usersModel
    .deleteProfile(id, userInfo)
    .then(({ status, result }) => {
      if (status === 404)
        return resHelper.success(res, status, {
          id: id,
          message: "User not found",
        });
      return resHelper.success(res, status, {
        id: id,
        message: "Data deleted successfully",
      });
    })
    .catch(({ status, err }) => {
      return resHelper.fail(res, status, {
        message: "An error occurred on the server",
        err,
      });
    });
};

const getPhoto = (req, res) => {
  const { userInfo } = req;

  usersModel
    .getPhoto(userInfo)
    .then(({ status, result }) => {
      return resHelper.success(res, status, result);
    })
    .catch(({ status, err }) => {
      return resHelper.fail(res, status, {
        message: "An error occurred on the server",
        err,
      });
    });
};

module.exports = {
  getAllProfile,
  getProfileById,
  addProfile,
  editProfile,
  deleteProfile,
  uploadPhoto,
  getPhoto,
  updatePassword,
};
