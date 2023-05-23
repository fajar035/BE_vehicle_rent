/* eslint-disable indent */
const mysql = require("mysql");
const db = require("../configs/db");
const format = require("../helpers/formatDate");

const getAllVehicle = (keyword, query, { category, location }) => {
  return new Promise((resolve, reject) => {
    let sql =
      "SELECT vehicles.id, vehicles.name, vehicles.description, vehicles.capacity, vehicles.price,vehicles.stock, vehicles.photo, vehicles.soft_delete ,category.category, location.location, status.status FROM vehicles JOIN category ON vehicles.id_category = category.id JOIN location ON vehicles.id_location = location.id JOIN status ON vehicles.id_status = status.id";
    const statement = [];
    const order = query.order;
    const sort = query.sort;
    const softDelete = query.softdelete;

    let orderBy = "";
    if (order && order.toLowerCase() == "id") orderBy = "id";
    if (order && order.toLowerCase() == "name") orderBy = "name";
    if (order && order.toLowerCase() == "price") orderBy = "price";

    // jika ada cari
    if (keyword.length !== 2) {
      sql += " WHERE name LIKE ?";
      statement.push(mysql.raw(keyword));
    }

    // jika ada cari & ada category
    if (keyword.length !== 2 && category.length !== 0) {
      sql += " AND category.category = ?";
      statement.push(mysql.raw(category));
    }

    // jika ada cari & ada location
    if (keyword.length !== 2 && location.length !== 0) {
      sql += " AND location.location = ?";
      statement.push(mysql.raw(location));
    }

    // jika ada location & gak ada cari
    if (
      location.length !== 0 &&
      keyword.length === 2 &&
      category.length === 0
    ) {
      sql += " WHERE location.location = ?";
      statement.push(mysql.raw(location));
    }

    // jika ada category & gak ada cari
    if (
      category.length !== 0 &&
      keyword.length === 2 &&
      location.length === 0
    ) {
      sql += " WHERE category.category = ?";
      statement.push(mysql.raw(category));
    }

    // jika gak ada cari & ada location sam category
    if (
      keyword.length === 2 &&
      location.length !== 0 &&
      category.length !== 0
    ) {
      sql += " WHERE location.location = ? AND category.category = ?";
      statement.push(mysql.raw(location));
      statement.push(mysql.raw(category));
    }

    if (sort && orderBy) {
      sql += " ORDER BY ? ?";
      statement.push(mysql.raw(order), mysql.raw(sort));
    }

    if (softDelete !== undefined && softDelete !== "") {
      sql += " WHERE soft_delete = '?'";
      statement.push(mysql.raw(softDelete));
    }

    const countQuery = `select count(*) as "count" from vehicles`;

    db.query(countQuery, (err, result) => {
      if (err) return reject({ status: 500, err });

      const page = parseInt(query.page);
      const limit = parseInt(query.limit);
      const count = result[0].count;
      const totalPage = Math.ceil(count / limit);

      if (query.page && query.limit) {
        sql += " LIMIT ? OFFSET ?";
        const offset = (page - 1) * limit;
        statement.push(limit, offset);
      }

      const meta = {
        next: isNaN(page)
          ? null
          : page == Math.ceil(count / limit)
          ? null
          : `/vehicles?order=name&sort=asc&page=${page + 1}&limit=${limit}`,
        prev: isNaN(limit)
          ? null
          : page == 1 || page == 0
          ? null
          : `/vehicles?order=name&sort=asc&page=${page - 1}&limit=${limit}`,
        totalPage,
        count,
      };

      db.query(sql, statement, (err, result) => {
        if (err) return reject({ status: 500, err });
        if (result.length == 0)
          return resolve({
            status: 404,
            result: { data: "Data not found", result },
          });
        resolve({ status: 200, result: result, meta });
      });
    });
  });
};

const getVehicleById = (id) => {
  return new Promise((resolve, reject) => {
    const sql =
      "select vehicles.id, vehicles.name, vehicles.description, vehicles.capacity, vehicles.price, vehicles.stock, vehicles.photo, category.category, location.location, status.status from vehicles join category on vehicles.id_category = category.id join location on vehicles.id_location = location.id join status on vehicles.id_status = status.id where vehicles.id = ?";
    db.query(sql, [id], (err, result) => {
      if (err) return reject({ status: 500, err });
      if (result.length == 0) return resolve({ status: 404, result });
      resolve({ status: 200, result: result });
    });
  });
};

const addVehicle = (body, inputPhoto) => {
  return new Promise((resolve, reject) => {
    const soft_delete = "0";
    const {
      name,
      description,
      capacity,
      price,
      stock,
      category,
      location,
      status,
    } = body;

    const sql =
      "INSERT INTO vehicles VALUES(null, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, null)";

    const date = new Date();
    const createdAt = format.formatDate(date);

    const statement = [
      name,
      description,
      capacity,
      price,
      stock,
      inputPhoto,
      soft_delete,
      category,
      location,
      status,
      createdAt,
    ];

    db.query(sql, statement, (err, result) => {
      console.log("ERR : ", err);
      if (err) return reject({ status: 500, err });
      resolve({
        status: 201,
        result: {
          name: name,
          description: description,
          capacity: capacity,
          price: price,
          stock: stock,
          // photos: JSON.parse(inputPhoto),
          photos: inputPhoto,
          category: category,
          location: location,
          status: status,
        },
      });
    });
  });
};

const createSoftDelete = (id, body) => {
  return new Promise((resolve, reject) => {
    const { softDelete } = body;
    if (!softDelete)
      return reject({
        err: { status: 400, message: "Data cannot be empty" },
      });
    if (softDelete !== "0" && softDelete !== "1")
      return reject({
        err: {
          status: 400,
          message: "Incorrect input, please enter 0 or 1",
          example: "0 = Restore Data, 1 = Delete Data",
        },
      });

    const sql = `UPDATE vehicles SET soft_delete = ? WHERE id = ?`;
    db.query(sql, [softDelete, id], (err, result) => {
      if (err) return reject({ status: 500, err });
      if (softDelete === "1")
        return resolve({
          result: {
            status: 200,
            id: id,
            message: "Successfuly Delete Data",
          },
        });
      if (softDelete === "0")
        return resolve({
          result: {
            status: 200,
            id: id,
            message: "Successfuly Restore Data",
          },
        });
    });
  });
};

const editVehicle = (id, body, bodyOld) => {
  return new Promise((resolve, reject) => {
    let {
      name,
      description,
      capacity,
      price,
      stock,
      category,
      location,
      status,
      photos,
    } = body;

    const {
      nameOld,
      descriptionOld,
      capacityOld,
      priceOld,
      stockOld,
      photoOld,
      id_categoryOld,
      id_locationOld,
      id_statusOld,
    } = bodyOld;
    if (!name) {
      name = nameOld;
    }
    if (!description) {
      description = descriptionOld;
    }
    if (!capacity) {
      capacity = capacityOld;
    }
    if (!price) {
      price = priceOld;
    }
    if (!stock) {
      stock = stockOld;
    }
    if (!photos) {
      photos = photoOld;
    }
    if (!category) {
      category = id_categoryOld;
    }
    if (!location) {
      location = id_locationOld;
    }
    if (!status) {
      status = id_statusOld;
    }

    const sql =
      "UPDATE vehicles SET name = ?, description = ?, capacity = ?, price = ?, stock = ?, photo = ?, id_category = ?, id_location = ?, id_status = ? , updatedAt = ? WHERE id = ?";

    const date = new Date();
    const updatedAt = format.formatDate(date);

    const statement = [
      name,
      description,
      capacity,
      price,
      stock,
      photos,
      category,
      location,
      status,
      updatedAt,
      id,
    ];

    db.query(sql, statement, (err, result) => {
      if (err) return reject({ status: 500, err });

      const { affectedRows } = result;
      if (affectedRows == 0) return resolve({ status: 404, result });
      return resolve({
        status: 200,
        message: "Successfuly changed data",
        result: {
          id: id,
          name: name,
          description: description,
          capacity: capacity,
          price: price,
          stock: stock,
          photos: JSON.parse(photos),
          category: category,
          location: location,
          status: status,
        },
      });
    });
  });
};

const deleteVehicle = (id) => {
  return new Promise((resolve, reject) => {
    if (id === undefined && id === null)
      return reject({ status: 400, message: "Id vehicle NULL" });
    const sql = "DELETE FROM vehicles WHERE id = ?";
    db.query(sql, [id], (err, result) => {
      const { affectedRows } = result;
      if (err) return reject({ status: 500, err });
      if (affectedRows == 0) return resolve({ status: 404, result });
      resolve({ status: 200 }, result);
    });
  });
};

const getPhotoVehicle = (images, id) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT photo FROM vehicles WHERE id = ?`;
    db.query(sql, [id], (err, result) => {
      if (err) return reject({ status: 500, err });
      return resolve({ status: 200, result });
    });
  });
};

const uploadPhotoVehicle = (namePhotos, id) => {
  return new Promise((resolve, reject) => {
    // console.log(namePhotos)
    const photos = namePhotos.map((item) => {
      const filePath = `/vehicles/photo/${item}`;
      return filePath;
    });
    const inputPhoto = JSON.stringify(photos);

    const sql = `UPDATE vehicles SET photo = ? WHERE id = ?`;

    db.query(sql, [inputPhoto, id], (err, result) => {
      if (err) return reject({ status: 500, err });
      // console.log(result)
      resolve({
        status: 200,
        result: { id: id, result: JSON.parse(inputPhoto) },
      });
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
  createSoftDelete,
};
