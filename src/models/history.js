const db = require("../configs/db")
const mysql = require("mysql")
const moment = require("moment")

// get all history
const getAllHistory = (query) => {
  return new Promise((resolve, reject) => {
    let sql =
      "SELECT h.id, u.name AS 'user', v.name AS 'vehicle', v.category, v.price, v.photo AS 'photo', h.booking_date, h.return_date, h.rating from history h join users u ON h.user_id = u.id join vehicles v ON h.vehicles_id = v.id"
    const statement = []
    const order = query.order
    let orderBy = ""
    if (query.by && query.by.toLowerCase() == "id") orderBy = "id"
    if (query.by && query.by.toLowerCase() == "user") orderBy = "user"
    if (order && orderBy) {
      sql += " ORDER BY ? ?"
      statement.push(mysql.raw(orderBy), mysql.raw(order))
    }
    db.query(sql, statement, (err, result) => {
      if (err) return reject({ status: 500, err })
      if (result.length == 0) return resolve({ status: 400, result })
      resolve({ status: 200, result })
    })
  })
}

// new history
const newHistory = (body) => {
  return new Promise((resolve, reject) => {
    const { user_id, vehicles_id, booking_date, return_date, rating } = body
    const sql = "INSERT INTO history VALUES(null, ?,?,?,?,?)"

    const dateBookingQuery = booking_date
    const dateReturnQuery = return_date

    const formatDate = (date) => {
      const dateStr = date.split("-")
      return dateStr[2] + "-" + dateStr[1] + "-" + dateStr[0]
    }

    if (
      typeof dateBookingQuery == "undefined" ||
      dateReturnQuery == "undefined"
    )
      return reject({ status: 500, message: "Data cannot be empty!" })

    const dataCheck = moment(
      dateBookingQuery || dateReturnQuery,
      "DD-MM-YYYY",
      true
    ).isValid()

    if (dataCheck == false)
      return reject({ status: 500, message: "Wrong input date" })

    const dateInputBooking = formatDate(dateBookingQuery)
    const dateInputReturn = formatDate(dateReturnQuery)

    const statement = [
      user_id,
      vehicles_id,
      dateInputBooking,
      dateInputReturn,
      rating
    ]

    db.query(sql, statement, (err, result) => {
      if (err) return reject({ status: 500, err })

      resolve({
        status: 201,
        result: {
          id: result.insertId,
          message: "Successful Car Rental",
          user_id,
          vehicles_id,
          booking_date,
          return_date,
          rating
        }
      })
    })
  })
}

// delete history
const deleteHistory = (id) => {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM history WHERE id = ?"
    db.query(sql, [id], (err, result) => {
      const { affectedRows } = result
      if (err) return reject({ status: 500, err })
      if (affectedRows == 0) return resolve({ status: 404, result })
      resolve({ status: 200 }, result)
    })
  })
}

module.exports = {
  getAllHistory,
  newHistory,
  deleteHistory
}
