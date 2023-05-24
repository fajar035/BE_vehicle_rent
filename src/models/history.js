const db = require("../configs/db");
const mysql = require("mysql");
// const moment = require("moment")
// const { format } = require("../configs/db")

// get all history
const getAllHistory = (keyword, query) => {
  return new Promise((resolve, reject) => {
    // total = jumlah price
    let sql = `SELECT h.id, u.id as "id_user", u.name as "name", v.name as "vehicle", c.category as "category", l.location as "location",v.price, h.qty, v.photo , h.start_date as "booking_date", h.return_date as "return_date", h.total_price as "total_price", h.rating FROM history h JOIN users u on h.id_users = u.id JOIN vehicles v on h.id_vehicles = v.id JOIN category c on v.id_category = c.id JOIN location l on v.id_location = l.id`;
    const statement = [];
    const order = query.sort;
    let orderBy = "";
    const category = query.category;

    if (query.by && query.by.toLowerCase() == "id") orderBy = "id";
    if (query.by && query.by.toLowerCase() == "name") orderBy = "name";
    if (query.by && query.by.toLowerCase() == "vehicle") orderBy = "vehicle";

    if (keyword.length !== 2 && query.id_user === undefined) {
      sql += " WHERE u.name LIKE ?";
      statement.push(mysql.raw(keyword));
    }
    if (keyword.length === 2 && query.id_user !== undefined) {
      sql += " WHERE u.id LIKE ?";
      statement.push(mysql.raw(query.id_user));
    }
    if (keyword !== 2 && category) {
      sql += " AND category = '?'";
      statement.push(mysql.raw(query.category));
    }
    if (order && orderBy) {
      sql += " ORDER BY ? ?";
      statement.push(mysql.raw(orderBy), mysql.raw(order));
    }
    const countQuery = `select count(*) as "count" from history`;
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
          : `/history?by=id&order=asc&page=${page + 1}&limit=${limit}`,
        prev: isNaN(limit)
          ? null
          : page == 1 || page == 0
          ? null
          : `/history?by=id&order=asc&page=${page - 1}&limit=${limit}`,
        totalPage,
        count,
      };

      db.query(sql, statement, (err, result) => {
        if (err) return reject({ status: 500, err });
        if (result.length == 0)
          return resolve({
            status: 400,
            result: { message: "Data not found", result },
          });
        resolve({ status: 200, result, meta });
      });
    });
  });
};

// history by id
const getHistoryById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT h.id, u.id as "id_user", v.id as "id_vehicle",u.name as "name", v.name as "vehicle", c.category as "category", l.location as "location",v.price, h.qty, v.stock, v.photo , h.start_date as "booking_date", h.return_date as "return_date", h.total_price as "total price", h.rating from history h join users u on h.id_users = u.id join vehicles v on h.id_vehicles = v.id join category c on v.id_category = c.id join location l on v.id_location = l.id where h.id = ?`;

    db.query(sql, [id], (err, result) => {
      if (err) return reject({ status: 500, err });
      if (result.length == 0) return resolve({ status: 404, result });
      resolve({ status: 200, result: result });
    });
  });
};

// new history
const newHistory = (body) => {
  return new Promise((resolve, reject) => {
    const {
      id_users,
      id_vehicles,
      qty,
      start_date,
      return_date,
      total_price,
      rating,
      testimony,
    } = body;
    if (
      id_users === undefined ||
      id_vehicles === undefined ||
      qty === undefined ||
      start_date === undefined ||
      return_date === undefined ||
      total_price === undefined
    ) {
      return reject({
        status: 400,
        err: { message: "Please check your input" },
      });
    }

    const sqlCheckQty = `SELECT stock  FROM vehicles WHERE id = ${id_vehicles}`;
    const sqlUpdateStatus = `UPDATE vehicles SET id_status = ? WHERE id = ${id_vehicles}`;
    const sqlUpdateStock = `UPDATE vehicles SET stock = ? WHERE id = ${id_vehicles}`;
    const sql = "INSERT INTO history VALUES(null, ?,?,?,?,?,?,?,?)";
    const formatDate = (date) => {
      const dateStr = date.split("-");
      return dateStr[2] + "-" + dateStr[1] + "-" + dateStr[0];
    };
    const dateInputBooking = formatDate(start_date);
    const dateInputReturn = formatDate(return_date);
    const statement = [
      id_users,
      id_vehicles,
      qty,
      dateInputBooking,
      dateInputReturn,
      total_price,
      rating,
      testimony,
    ];

    db.query(sqlCheckQty, (err, result) => {
      if (err) return reject({ status: 500, err });
      const stock = parseInt(result[0].stock);
      if (stock === 0) {
        db.query(sqlUpdateStatus, [2], (err) => {
          if (err) return reject({ status: 500, err });
          return resolve({
            status: 406,
            result: {
              id_vehicles,
              stock,
              message: "Vehicle not available",
            },
          });
        });
      } else {
        db.query(sqlUpdateStatus, [1], (err) => {
          if (err) return reject({ status: 500, err });

          db.query(sql, statement, (err, result) => {
            if (err) return reject({ status: 500, err });
            if (stock >= qty) {
              const newStock = stock - qty;
              db.query(sqlUpdateStock, [newStock], (err) => {
                if (err) return reject({ status: 500, err });
              });
              resolve({
                status: 201,
                result: {
                  id: result.insertId,
                  message: "Successful Car Rental",
                  id_users,
                  id_vehicles,
                  qty,
                  start_date,
                  return_date,
                  total_price,
                  rating,
                  testimony,
                },
              });
            } else {
              reject({
                status: 400,
                err: {
                  message: "QTY cannot be more than the vehicle stock",
                },
              });
            }
          });
        });
      }
    });
  });
};

// delete history
const deleteHistory = (id) => {
  return new Promise((resolve, reject) => {
    const sqlGetHistory = `SELECT * FROM history WHERE id = ${id}`;
    const sql = "DELETE FROM history WHERE id = ?";
    db.query(sqlGetHistory, (err, result) => {
      if (err) return reject({ status: 500, err });
      if (result.length === 0)
        return resolve({
          status: 404,
          result: { id: id, message: "Data not found" },
        });

      const history = result[0];
      const { qty, id_vehicles } = history;
      const sqlCheckQty = `SELECT stock  FROM vehicles WHERE id = ${id_vehicles}`;
      const sqlUpdateStatus = `UPDATE vehicles SET id_status = ? WHERE id = ${id_vehicles}`;
      const sqlUpdateStock = `UPDATE vehicles SET stock = ? WHERE id = ${id_vehicles}`;
      db.query(sqlCheckQty, (err, result) => {
        if (err) return reject({ status: 500, err });
        const stock = parseInt(result[0].stock);
        if (stock >= 0) {
          db.query(sqlUpdateStatus, [1], (err) => {
            if (err) return reject({ status: 500, err });
            const newStock = stock + parseInt(qty);
            db.query(sqlUpdateStock, [newStock], (err) => {
              if (err) return reject({ status: 500, err });
            });
          });
        }
      });
    });

    db.query(sql, [id], (err, result) => {
      const { affectedRows } = result;
      if (err)
        return reject({
          status: 500,
          err: { message: "An error occurred on the server" },
        });
      resolve({
        status: 200,
        result: { id: id, message: "History deleted successfuly" },
      });
    });
  });
};

// popular vehicles by rating
const popular = (query) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT h.id, u.id as "id_user", v.id as "id_vehicle",u.name as "name", v.name as "vehicle", c.category as "category", l.location as "location",v.price, h.qty, v.stock , v.photo , h.start_date as "booking_date", h.return_date as "return_date", h.total_price as "total price", h.rating from history h join users u on h.id_users = u.id join vehicles v on h.id_vehicles = v.id join category c on v.id_category = c.id join location l on v.id_location = l.id where h.rating = 5 OR h.rating = 4 order by h.rating`;

    const statement = [];
    const countQuery = `select count(*) as "count" from history`;

    db.query(countQuery, (err, result) => {
      if (err) return reject({ status: 500, err });

      const page = parseInt(query.page);
      const limit = parseInt(query.limit);
      const count = result[0].count;
      const totalPage = Math.ceil(count / page);
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
          : `/history?by=id&order=asc&page=${page + 1}&limit=${limit}`,
        prev: isNaN(limit)
          ? null
          : page == 1 || page == 0
          ? null
          : `/history?by=id&order=asc&page=${page - 1}&limit=${limit}`,
        totalPage,
        count,
      };
      db.query(sql, statement, (err, result) => {
        if (err) return reject({ status: 500, err });
        console.log("RESULT : ", result);
        if (result.length == 0)
          return resolve({
            status: 400,
            result: { message: "Data not found", result },
          });
        resolve({ status: 200, result, meta });
      });
    });

    // db.query(sql, (err, result) => {
    //   // console.log(err, result)
    //   if (err) return reject({ status: 500, err });
    //   return resolve({ status: 200, result });
    // });
  });
};

const updateRating = (idHistory, rating) => {
  return new Promise((resolve, reject) => {
    // console.log("ID HISTORY", idHistory);
    // console.log("RATING", rating);
    const ratingNum = parseInt(rating);

    if (!rating)
      return resolve({
        status: 400,
        result: {
          id: idHistory,
          message: "Rating can't be empty",
        },
      });
    if (isNaN(ratingNum)) {
      return resolve({
        status: 400,
        result: {
          id: idHistory,
          message: "Rating must be number data type",
        },
      });
    }

    if (ratingNum > 5) {
      return resolve({
        status: 400,
        result: {
          id: idHistory,
          message: "Wrong input, Rating 1 - 5",
        },
      });
    }
    if (typeof ratingNum !== "Number") {
      const sql = `UPDATE history SET rating = ? WHERE id = ?`;
      db.query(sql, [ratingNum, idHistory], (err) => {
        if (err) return reject({ status: 500, err });

        return resolve({
          status: 200,
          result: {
            id: idHistory,
            message: "Successfuly changed data",
          },
        });
      });
    } else {
      return resolve({
        status: 400,
        result: {
          id: idHistory,
          message: "Wrong input, Rating must be number",
        },
      });
    }
  });
};

module.exports = {
  getAllHistory,
  newHistory,
  deleteHistory,
  popular,
  getHistoryById,
  updateRating,
};
