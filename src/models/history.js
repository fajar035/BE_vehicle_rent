const db = require("../configs/db")
const mysql = require("mysql")
// const moment = require("moment")
// const { format } = require("../configs/db")

// get all history
const getAllHistory = (keyword, query) => {
  return new Promise((resolve, reject) => {
    // total = jumlah price
    let sql = `SELECT h.id, u.name as "name", v.name as "vehicle", c.category as "category", l.location as "location",v.price, h.qty, v.photo , h.start_date as "booking_date", h.return_date as "return_date", (price * qty) as "total price", h.rating from history h join users u on h.id_users = u.id join vehicles v on h.id_vehicles = v.id join category c on h.id_category = c.id join location l on h.id_location = l.id`
    const statement = []
    const order = query.sort
    let orderBy = ""
    if (query.by && query.by.toLowerCase() == "id") orderBy = "id"
    if (query.by && query.by.toLowerCase() == "name") orderBy = "name"
    if (query.by && query.by.toLowerCase() == "vehicle") orderBy = "vehicle"
    if (keyword.length !== 2) {
      sql += " WHERE u.name LIKE ?"
      statement.push(mysql.raw(keyword))
    }
    if (order && orderBy) {
      sql += " ORDER BY ? ?"
      statement.push(mysql.raw(orderBy), mysql.raw(order))
    }
    // console.log(orderBy)
    // ambil total data
    const countQuery = `select count(*) as "count" from history`
    // let count
    db.query(countQuery, (err, result) => {
      if (err) return reject({ status: 500, err })

      const page = parseInt(query.page)
      const limit = parseInt(query.limit)
      const count = result[0].count
      const totalPage = Math.ceil(count / limit)
      if (query.page && query.limit) {
        sql += " LIMIT ? OFFSET ?"
        const offset = (page - 1) * limit
        statement.push(limit, offset)
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
        count
      }
      console.log(statement)
      db.query(sql, statement, (err, result) => {
        if (err) return reject({ status: 500, err })
        if (result.length == 0)
          return resolve({
            status: 400,
            result: { message: "Data not found", result }
          })
        resolve({ status: 200, result, meta })
      })
    })
  })
}

// history by id
const getHistoryById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT h.id, u.name as "name", v.name as "vehicle", c.category as "category", l.location as "location",v.price, h.qty, v.photo , h.start_date as "booking_date", h.return_date as "return_date", (price * qty) as "total price", h.rating from history h join users u on h.id_users = u.id join vehicles v on h.id_vehicles = v.id join category c on h.id_category = c.id join location l on h.id_location = l.id where h.id = ?`

    db.query(sql, [id], (err, result) => {
      if (err) return reject({ status: 500, err })
      if (result.length == 0) return resolve({ status: 404, result })
      resolve({ status: 200, result: result })
    })
  })
}

// new history
const newHistory = (body) => {
  return new Promise((resolve, reject) => {
    const {
      id_users,
      id_vehicles,
      id_category,
      id_location,
      qty,
      start_date,
      return_date,
      total,
      rating,
      testimony
    } = body

    const sql = "INSERT INTO history VALUES(null, ?,?,?,?,?,?,?,?,?,?)"
    const formatDate = (date) => {
      const dateStr = date.split("-")
      return dateStr[2] + "-" + dateStr[1] + "-" + dateStr[0]
    }

    const dateInputBooking = formatDate(start_date)
    const dateInputReturn = formatDate(return_date)
    // INSERT INTO `vehicle_rent`.`history` (`id_users`, `id_vehicles`, `id_category`, `id_location`, `qty`, `start_date`, `return_date`, `total`, `rating`, `testimony`) VALUES ('80', '5', '3', '6', '1', '2022-01-10', '2022-02-24', '1', '5', 'Mantab');

    const statement = [
      id_users,
      id_vehicles,
      id_category,
      id_location,
      qty,
      dateInputBooking,
      dateInputReturn,
      total,
      rating,
      testimony
    ]

    db.query(sql, statement, (err, result) => {
      console.log(sql, statement)
      if (err) return reject({ status: 500, err })
      resolve({
        status: 201,
        result: {
          id: result.insertId,
          message: "Successful Car Rental",
          id_users,
          id_vehicles,
          id_category,
          id_location,
          qty,
          start_date,
          return_date,
          total,
          rating,
          testimony
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

// popular vehicles by rating
const popular = () => {
  return new Promise((resolve, reject) => {
    const sql = `select h.id, u.name as 'name', v.name as 'vehicle', c.category ,  l.location,v.price, v.photo as 'photo', h.qty, h.start_date as 'booking date', h.return_date as 'return date', h.total, h.rating from history h join users u ON h.id_users = u.id join vehicles v ON h.id_vehicles = v.id join category c on h.id_category = c.id join location l on h.id_location = l.id where h.rating = 5 order by h.rating`

    db.query(sql, (err, result) => {
      // console.log(err, result)
      if (err) return reject({ status: 500, err })
      return resolve({ status: 200, result })
    })
  })
}

module.exports = {
  getAllHistory,
  newHistory,
  deleteHistory,
  popular,
  getHistoryById
}
