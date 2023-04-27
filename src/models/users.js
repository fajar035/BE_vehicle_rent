/* eslint-disable indent */
const mysql = require("mysql");
const db = require("../configs/db");
const bcrypt = require("bcryptjs");

// get all Profile, by order id & name
const getAllProfile = (keyword, query, userInfo) => {
  return new Promise((resolve, reject) => {
    const { roles } = userInfo;

    let sql =
      "SELECT  id, name, email ,gender, dob, nohp, address, photo, createdAt FROM users";
    const statement = [];

    const order = query.order;
    let orderBy = "";
    if (query.sort && query.sort.toLowerCase() == "id") orderBy = "id";
    if (query.sort && query.sort.toLowerCase() == "name") orderBy = "name";

    if (keyword.length !== 2) {
      sql += " WHERE name LIKE ?";
      statement.push(mysql.raw(keyword));
    }

    if (order && orderBy) {
      sql += " ORDER BY ? ?";
      statement.push(mysql.raw(orderBy), mysql.raw(order));
    }

    // ambil total data
    const countQuery = `select count(*) as "count" from users`;
    // let count
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
          : `/users?by=id&order=asc&page=${page + 1}&limit=${limit}`,
        prev: isNaN(limit)
          ? null
          : page == 1 || page == 0
          ? null
          : `/users?by=id&order=asc&page=${page - 1}&limit=${limit}`,
        totalPage,
        count
      };

      db.query(sql, statement, (err, result) => {
        if (err) return reject({ status: 500, err });
        // const roles = "2"
        if (roles !== "2")
          reject({
            status: 401,
            err: { message: "Only admin has this access" }
          });

        // query page tidak ditemukan
        if (result.length == 0)
          return resolve({
            status: 400,
            result: {
              data: "Data not found",
              result
            }
          });

        resolve({ status: 200, result: result, meta });
      });
    });
  });
};

// get profile by id
const getProfileById = (id) => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT id, name, gender,email,dob, nohp, address, photo, createdAt FROM users WHERE id = ?";

    db.query(sql, [id], (err, result) => {
      if (err) return reject({ status: 500, err });
      if (result.length == 0) return resolve({ status: 404, result });
      console.log("RESULT : ", result)
      resolve({ status: 200, result });
    });
  });
};

// add new profile
const addProfile = (body) => {
  return new Promise((resolve, reject) => {
    const { name, gender, dob, nohp, address } = body;

    if (
      typeof name == "undefined" ||
      typeof gender == "undefined" ||
      typeof dob == "undefined" ||
      typeof nohp == "undefined" ||
      typeof address == "undefined"
    )
      return resolve({ status: 404 });

    const dateQuery = dob;

    const formatDate = (date) => {
      const dateStr = date.split("-");
      return dateStr[2] + "-" + dateStr[1] + "-" + dateStr[0];
    };

    const dateInput = formatDate(dateQuery);

    const sql =
      "INSERT INTO users VALUES(null, ? , ? , ? , ? , ? ,null, null, null)";
    const statement = [name, gender, dob, nohp, address];
    db.query(sql, statement, (err, result) => {
      if (err) return reject({ status: 500, message: "Query Error", err });
      resolve({
        status: 201,
        result: {
          name,
          gender,
          nohp,
          dateInput,
          address
        }
      });
    });
  });
};

// Update Password
const updatePassword = (oldPassword, newPassword, id) => {
  return new Promise((resolve, reject) => {
    const sqlOldPassword = `SELECT password FROM users WHERE id = ?`;
    db.query(sqlOldPassword, [id], (err, result) => {
      if (err) return reject({ status: 500, message: "Query Error", err });
      console.log("PASSWORD", result[0].password);
      const passwordDB = result[0].password;
      bcrypt.compare(oldPassword, passwordDB, (err, result) => {
        if (err)
          return reject({ status: 400, message: "Compare bcryptjs Failed", err });
        console.log("RESULT HASED", result);
        if (result === false) {
          const error = new Error("Old password is incorrect");
          return reject({ status: 400, message: "Old password is incorrect" });
        }
        bcrypt
          .hash(newPassword, 10)
          .then((hashedPassword) => {
            const sqlUpdatePassword = `UPDATE users
            SET password = ?
            WHERE id = ?`;
            db.query(sqlUpdatePassword, [hashedPassword, id], (err, result) => {
              if (err) return reject(err);
              return resolve({
                status: 200,
                result: { id: id, message: "Update password success" }
              });
            });
          })
          .catch((err) => {
            return reject({ status: 500, message: "bcryptjs hash eror", err });
          });
      });
    });
  });
};

// edit profile
const editProfile = (body, userInfo, bodyOld) => {
  return new Promise((resolve, reject) => {
    let { name, gender, dob, nohp, address, photo, email } = body;

    const {
      nameOld,
      genderOld,
      dobOld,
      noHpOld,
      addressOld,
      photoOld,
      emailOld
    } = bodyOld;
    const { id } = userInfo;

    const formatDate = (date) => {
      const dateStr = date.split("-");
      return dateStr[2] + "-" + dateStr[1] + "-" + dateStr[0];
    };

    let dateQuery = dob;

    if (!name) {
      name = nameOld;
    }
    if (!gender) {
      gender = genderOld;
    }
    if (!dateQuery) {
      dateQuery = dobOld;
    }
    if (!nohp) {
      nohp = noHpOld;
    }
    if (!address) {
      address = addressOld;
    }
    if (!photo) {
      photo = photoOld;
    }
    if (!email) {
      email = emailOld;
    }

    const dateInput = formatDate(dateQuery);
    // console.log("DATE-INPUT", dateInput)

    const statement = [name, gender, dob, nohp, address, photo, email, id];

    const sql =
      "UPDATE users SET name = ?, gender = ?, dob = ?, nohp = ?, address = ?, photo = ?, email = ? WHERE id = ?";
    db.query(sql, statement, (err, result) => {
      if (err) return reject({ status: 500, err });
      const { affectedRows } = result;
      if (affectedRows == 0) return resolve({ status: 404, result });
      resolve({
        status: 200,
        message: "Successfuly changed data",
        result: {
          id: id,
          name: name,
          email: email,
          gender: gender,
          dob: dateInput,
          noHp: nohp,
          address: address,
          photo: photo
        }
      });
    });
  });
};

// delete profile
const deleteProfile = (id, userInfo) => {
  return new Promise((resolve, reject) => {
    const { roles } = userInfo;
    const sql = "DELETE FROM users WHERE id = ?";

    db.query(sql, [id], (err, result) => {
      if (roles !== "2")
        reject({ status: 401, err: "Only admin has this access" });
      const { affectedRows } = result;

      if (err) return reject({ status: 500, err });

      if (affectedRows == 0) return resolve({ status: 404, result });
      resolve({ status: 200, result });
    });
  });
};

// upload photo
const uploadPhoto = (fileName, userInfo) => {
  return new Promise((resolve, reject) => {
    const { id, email } = userInfo;

    const filePath = `/users/photo/${fileName}`;
    const sql = "UPDATE users SET photo = ? WHERE id = ?";
    db.query(sql, [filePath, id], (err, result) => {
      if (err) return reject({ status: 500, err });
      resolve({
        status: 200,
        result: { id: id, email: email, filename: fileName }
      });
    });
  });
};

const getPhoto = (userInfo) => {
  return new Promise((resolve, reject) => {
    const { id, email } = userInfo;
    const sql = "SELECT photo FROM users WHERE id = ?";
    db.query(sql, [id], (err, result) => {
      if (err) return reject({ status: 500, err });
      resolve({ status: 200, result: { result, id: id, email: email } });
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
  updatePassword
};
