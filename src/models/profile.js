const mysql = require("mysql")
const db = require("../configs/db")
const moment = require("moment")

// get all Profile, by order id & name
const getAllProfile = (keyword, query) => {
  return new Promise((resolve, reject) => {
    let sql =
      "SELECT id, name, gender, phoneNumber, dateOfbirth, address, photo FROM users"
    const statement = []
    const order = query.order
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

      const meta = {
        next:
          page == Math.ceil(count / limit)
            ? null
            : `/profile?by=id&order=asc&page=${page + 1}&limit=${limit}`,
        prev:
          page == 1
            ? null
            : `/profile?by=id&order=asc&page=${page - 1}&limit=${limit}`,
        count
      }
      db.query(sql, statement, (err, profile) => {
        console.log(statement)
        if (err) return reject({ status: 500, err })
        if (profile.length == 0)
          return resolve({
            status: 400,
            result: { data: "Data not found", profile }
          })
        resolve({ status: 200, result: { data: meta, profile } })
      })
    })
  })
}

// get profile by id
const getProfileById = (id) => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT id,  name, gender, phoneNumber, dateOfBirth, address, photo FROM users WHERE id = ?"
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
    const { name, gender, phoneNumber, dateOfBirth, address, photo } = body

    if (
      typeof name == "undefined" ||
      typeof gender == "undefined" ||
      typeof phoneNumber == "undefined" ||
      typeof dateOfBirth == "undefined" ||
      typeof address == "undefined" ||
      typeof photo == "undefined"
    )
      return resolve({ status: 404 })

    const dateQuery = dateOfBirth

    const formatDate = (date) => {
      const dateStr = date.split("-")
      return dateStr[2] + "-" + dateStr[1] + "-" + dateStr[0]
    }

    const dateInput = formatDate(dateQuery)
    // insert into users values(id, name, gender, phoneNumber, dateInput, address, photo, email,null, null )
    const sql = "INSERT INTO users VALUES(null, ? , ? , ? , ? , ? , ?)"
    const statement = [name, gender, phoneNumber, dateInput, address, photo]

    db.query(sql, statement, (err, result) => {
      if (err) return reject({ status: 500, message: "Query Error", err })
      resolve({
        status: 201,
        result: {
          name,
          gender,
          phoneNumber,
          dateInput,
          address,
          photo
        }
      })
    })
  })
}

// edit profile
const editProfile = (id, body) => {
  return new Promise((resolve, reject) => {
    const { name, gender, phoneNumber, dateOfBirth, address, photo } = body

    const dateQuery = dateOfBirth

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
    const statement = [name, gender, phoneNumber, dateInput, address, photo, id]

    const sql =
      "UPDATE users SET name = ?, gender = ?, phoneNumber = ?, dateOfBirth = ?, address = ?, photo = ? WHERE id = ?"

    db.query(sql, statement, (err, result) => {
      if (err) return reject({ status: 500, err })
      const { affectedRows } = result
      if (affectedRows == 0) return resolve({ status: 404, result })
      resolve({ status: 200, result })
    })
  })
}

// delete profile
const deleteProfile = (id) => {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM users WHERE id = ?"
    db.query(sql, [id], (err, result) => {
      const { affectedRows } = result

      if (err) return reject({ status: 500, err })

      if (affectedRows == 0) return resolve({ status: 404, result })
      resolve({ status: 200 }, result)
    })
  })
}

// upload photo
const uploadPhoto = (id, fileName) => {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE users SET photo = ? WHERE id = ?"
    db.query(sql, [fileName, id], (err, result) => {
      if (err) return reject({ status: 500, err })
      resolve({ status: 200, result: result.message })
    })
  })
}

module.exports = {
  getAllProfile,
  getProfileById,
  addProfile,
  editProfile,
  deleteProfile,
  uploadPhoto
}
