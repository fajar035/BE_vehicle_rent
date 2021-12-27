/* eslint-disable indent */
const mysql = require("mysql")
const db = require("../configs/db")
const moment = require("moment")

// get all Profile, by order id & name
const getAllProfile = (keyword, query, userInfo) => {
  return new Promise((resolve, reject) => {
    const { roles } = userInfo

    let sql =
      "SELECT  id, name, email ,gender, dob, nohp, address, photo FROM users"
    const statement = []

    const order = query.sort
    let orderBy = ""
    if (query.by && query.by.toLowerCase() == "id") orderBy = "id"
    if (query.by && query.by.toLowerCase() == "name") orderBy = "name"

    if (keyword.length !== 2) {
      sql += " WHERE name LIKE ?"
      statement.push(mysql.raw(keyword))
    }

    if (order && orderBy) {
      sql += " ORDER BY ? ?"
      statement.push(mysql.raw(orderBy), mysql.raw(order))
    }

    // ambil total data
    const countQuery = `select count(*) as "count" from users`
    // let count
    db.query(countQuery, (err, result) => {
      if (err) return reject({ status: 500, err })

      const page = parseInt(query.page)
      const limit = parseInt(query.limit)
      const count = result[0].count

      if (query.page && query.limit) {
        sql += " LIMIT ? OFFSET ?"
        const offset = (page - 1) * limit
        statement.push(limit, offset)
      }

      // const meta = {
      //   next:
      //     page == Math.ceil(count / limit)
      //       ? null
      //       : `/profile?by=id&order=asc&page=${page + 1}&limit=${limit}`,
      //   prev:
      //     page == 1
      //       ? null
      //       : `/profile?by=id&order=asc&page=${page - 1}&limit=${limit}`,
      //   count
      // }

      const meta2 = {
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
        count
      }

      db.query(sql, statement, (err, result) => {
        if (err) return reject({ status: 500, err })
        // const roles = "2"
        if (roles !== "2")
          reject({ status: 401, err: "Only admin has this access" })

        // query page tidak ditemukan
        if (result.length == 0)
          return resolve({
            status: 400,
            result: {
              data: "Data not found",
              result
            }
          })

        resolve({ status: 200, result: { page: meta2, result } })
      })
    })
  })
}

// get profile by id
const getProfileById = (id) => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT id, name, email,dob, nohp, address, photo FROM users WHERE id = ?"
    db.query(sql, [id], (err, result) => {
      if (err) return reject({ status: 500, err })
      if (result.length == 0) return resolve({ status: 404, result })
      resolve({ status: 200, result })
    })
  })
}

// add new profile
const addProfile = (body) => {
  return new Promise((resolve, reject) => {
    const { name, gender, dob, nohp, address } = body

    if (
      typeof name == "undefined" ||
      typeof gender == "undefined" ||
      typeof dob == "undefined" ||
      typeof nohp == "undefined" ||
      typeof address == "undefined"
    )
      return resolve({ status: 404 })

    const dateQuery = dob

    const formatDate = (date) => {
      const dateStr = date.split("-")
      return dateStr[2] + "-" + dateStr[1] + "-" + dateStr[0]
    }

    const dateInput = formatDate(dateQuery)
    // insert into users values(id, name, gender, phoneNumber, dateInput, address, photo, email,null, null )
    const sql =
      "INSERT INTO users VALUES(null, ? , ? , ? , ? , ? ,null, null, null)"
    const statement = [name, gender, dateInput, nohp, address]
    db.query(sql, statement, (err, result) => {
      if (err) return reject({ status: 500, message: "Query Error", err })
      resolve({
        status: 201,
        result: {
          name,
          gender,
          nohp,
          dateInput,
          address
        }
      })
    })
  })
}

// edit profile
const editProfile = (body, userInfo) => {
  return new Promise((resolve, reject) => {
    const { name, gender, dob, nohp, address } = body
    const { id } = userInfo
    const dateQuery = dob

    const formatDate = (date) => {
      const dateStr = date.split("-")
      return dateStr[2] + "-" + dateStr[1] + "-" + dateStr[0]
    }
    if (typeof dateQuery == "undefined")
      return reject({ status: 404, message: "Data cannot be empty!" })

    const dataCheck = moment(dateQuery, "DD-MM-YYYY", true).isValid()

    if (dataCheck == false)
      return reject({ status: 500, message: "Wrong input date" })

    const dateInput = formatDate(dateQuery)
    const statement = [name, gender, dateInput, nohp, address, id]

    const sql =
      "UPDATE users SET name = ?, gender = ?, dob = ?, nohp = ?, address = ? WHERE id = ?"
    db.query(sql, statement, (err, result) => {
      if (err) return reject({ status: 500, err })
      const { affectedRows } = result
      if (affectedRows == 0) return resolve({ status: 404, result })
      resolve({ status: 200, result })
    })
  })
}

// delete profile
const deleteProfile = (id, userInfo) => {
  return new Promise((resolve, reject) => {
    const { roles } = userInfo
    const sql = "DELETE FROM users WHERE id = ?"

    db.query(sql, [id], (err, result) => {
      if (roles !== "2")
        reject({ status: 401, err: "Only admin has this access" })
      const { affectedRows } = result

      if (err) return reject({ status: 500, err })

      if (affectedRows == 0) return resolve({ status: 404, result })
      resolve({ status: 200 }, result)
    })
  })
}

// upload photo
const uploadPhoto = (fileName, userInfo) => {
  return new Promise((resolve, reject) => {
    const { id, email } = userInfo
    const sql = "UPDATE users SET photo = ? WHERE id = ?"
    db.query(sql, [fileName, id], (err, result) => {
      if (err) return reject({ status: 500, err })
      resolve({
        status: 200,
        result: { id: id, email: email, filename: fileName }
      })
    })
  })
}

const getPhoto = (userInfo) => {
  return new Promise((resolve, reject) => {
    const { id, email } = userInfo
    const sql = "SELECT photo FROM users WHERE id = ?"
    db.query(sql, [id], (err, result) => {
      if (err) return reject({ status: 500, err })
      resolve({ status: 200, result: { result, id: id, email: email } })
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
