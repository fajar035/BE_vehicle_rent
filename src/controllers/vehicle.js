const vehicleModel = require("../models/vehicle");
const resHelper = require("../helpers/response");

const getAllVehicle = (req, res) => {
  const { query } = req;
  let keyword = `%%`;
  // let keywordFilter = ``;
  const filter = {
    category: "",
    location: ""
  };

  if (query.search) keyword = `'%${query.search}%'`;
  if (query.filterCategory) filter.category = `'${query.filterCategory}'`;
  if (query.filterLocation) filter.location = `'${query.filterLocation}'`;
  vehicleModel
    .getAllVehicle(keyword, query, filter)
    .then(({ status, result, meta }) => {
      return resHelper.success(res, status, { result, meta });
    })
    .catch(({ status, err }) => {
      return resHelper.fail(res, status, { err });
    });
};

const getVehicleById = (req, res) => {
  const { params } = req;
  const id = params.id;
  vehicleModel
    .getVehicleById(id)
    .then(({ status, result }) => {
      return resHelper.success(res, status, { result });
    })
    .catch(({ status, err }) => {
      return resHelper.fail(res, status, { err });
    });
};

const addVehicle = (req, res) => {
  const { body, files } = req;
  const dataPhotos = files;
  const namePhotos = [];
  if (dataPhotos) {
    for (let index = 0; index < files.length; index++) {
      namePhotos.push(files[index].filename);
    }
  }

  if (namePhotos.length !== 0) {
    const photos = namePhotos.map((item) => {
      const filePath = `/vehicles/photo/${item}`;
      return filePath;
    });
    // eslint-disable-next-line no-var
    var inputPhoto = JSON.stringify(photos);
  }
  vehicleModel
    .addVehicle(body, inputPhoto)
    .then(({ status, result }) => {
      res
        .status(status)
        .json({ message: "Add new vehicle successfuly", result });
    })
    .catch(({ status, err }) => {
      res
        .status(status)
        .json({ message: "An error occurred on the server", err });
    });
};

const softDeleteVehicle = (req, res) => {
  let { body, params } = req;
  const id = params.id;

  vehicleModel
    .createSoftDelete(id, body)
    .then(({ result }) => {
      // resHelper.success(res, status, { message, result });
      // console.log("MESSAGE", status, result);
      if (result.status === 200)
        return resHelper.success(res, result.status, { result });
    })
    .catch(({ err }) => {
      return resHelper.fail(res, err.status, { err });
      console.log("ERROR", err);
    });
};

const editVehicle = (req, res) => {
  let { body, params, files, bodyOld } = req;
  const id = params.id;
  const dataPhotos = files;
  const namePhotos = [];
  if (dataPhotos) {
    for (let index = 0; index < files.length; index++) {
      namePhotos.push(files[index].filename);
    }
  }
  if (namePhotos.length !== 0) {
    const photos = namePhotos.map((item) => {
      const filePath = `/vehicles/photo/${item}`;
      return filePath;
    });
    // eslint-disable-next-line no-var
    var inputPhoto = JSON.stringify(photos);
  }

  if (dataPhotos) {
    body = {
      ...body,
      photos: inputPhoto
    };
  } else {
    body = {
      ...body
    };
  }

  vehicleModel
    .editVehicle(id, body, bodyOld)
    .then(({ status, result, message }) => {
      if (status === 404)
        resHelper.success(res, status, {
          result: {
            id: id,
            status: status,
            message: "User not found"
          }
        });
      resHelper.success(res, status, { message, result });
    })
    .catch(({ status, err }) => {
      return resHelper.fail(res, status, { err });
    });
};

const deleteVehicle = (req, res) => {
  const { params } = req;
  const id = params.id;
  vehicleModel
    .deleteVehicle(id)
    .then(({ status, result }) => {
      if (status === 404)
        return res
          .status(status)
          .json({ id: id, message: "Data Vehicle not found" });
      return res
        .status(status)
        .json({ id: id, message: "Data deleted successfully" });
    })
    .catch(({ status, err }) => {
      res
        .status(status)
        .json({ message: "An error occurred on the server", err });
    });
};

const uploadPhotoVehicle = (req, res) => {
  const { id } = req.params;
  // const { filename } = req.files
  const photos = req.files;
  const namePhotos = [];
  // console.log("PHOTOS", photos)
  for (let index = 0; index < photos.length; index++) {
    namePhotos.push(photos[index].filename);
  }
  // console.log("NAME-PHOTOS", namePhotos)

  vehicleModel
    .uploadPhotoVehicle(namePhotos, id)
    .then(({ status, result }) => {
      return resHelper.success(res, status, {
        message: "Upload Successfuly",
        result: result
      });
    })
    .catch(({ status, err }) => {
      return resHelper.fail(res, status, {
        message: "An error occurred on the server",
        err
      });
    });
};

const getPhotoVehicle = (req, res) => {
  const { id } = req.query;

  vehicleModel
    .getPhotoVehicle(id)
    .then(({ status, result }) => {
      return resHelper.success(res, status, result);
    })
    .catch(({ status, err }) => {
      return resHelper.fail(res, status, {
        message: "An error occurred on the server"
      });
    });
};

module.exports = {
  getAllVehicle,
  getVehicleById,
  addVehicle,
  editVehicle,
  deleteVehicle,
  getPhotoVehicle,
  uploadPhotoVehicle,
  softDeleteVehicle
};
