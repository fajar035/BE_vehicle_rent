/* eslint-disable indent */
// const { reject } = require("bcrypt/promises")
// const res = require("express/lib/response")
const mysql = require("mysql")
const db = require("../configs/db")

const getAllVehicle = (keyword, query) => {
  return new Promise((resolve, reject) => {
    let sql = "SELECT * FROM vehicles"
    const statement = []
    const order = query.sort
    let orderBy = ""
    if (query.by && query.by.toLowerCase() == "id") orderBy = "id"
    if (query.by && query.by.toLowerCase() == "name") orderBy = "name"
    if (query.by && query.by.toLowerCase() == "price") orderBy = "price"

    if (keyword.length !== 2) {
      sql += " WHERE name LIKE ?"
      statement.push(mysql.raw(keyword))
    }

    if (order && orderBy) {
      sql += " ORDER BY ? ?"
      statement.push(mysql.raw(orderBy), mysql.raw(order))
    }

    const countQuery = `select count(*) as "count" from vehicles`

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
        next: isNaN(page)
          ? null
          : page == Math.ceil(count / limit)
          ? null
          : `/vehicles?by=id&order=asc&page=${page + 1}&limit=${limit}`,
        prev: isNaN(limit)
          ? null
          : page == 1 || page == 0
          ? null
          : `/vehicles?by=id&order=asc&page=${page - 1}&limit=${limit}`,
        count
      }
      db.query(sql, statement, (err, result) => {
        if (err) return reject({ status: 500, err })
        if (result.length == 0)
          return resolve({
            status: 400,
            result: { data: "Data not found", result }
          })
        resolve({ status: 200, result: { data: meta, result } })
      })
    })
  })
}

const getVehicleById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM vehicles WHERE id = ?"
    db.query(sql, [id], (err, result) => {
      if (err) return reject({ status: 500, err })
      if (result.length == 0) return resolve({ status: 404, result })
      resolve({ status: 200, result })
    })
  })
}

const addVehicle = (body) => {
  return new Promise((resolve, reject) => {
    console.log(body)

    const {
      name,
      description,
      capacity,
      price,
      stock,
      category,
      location,
      status
    } = body

    const sql = "INSERT INTO vehicles VALUES(null, ?, ?, ?, ?, ?, ?, ?, ?, ?)"

    const statement = [
      name,
      description,
      capacity,
      price,
      stock,
      { photo: null },
      category,
      location,
      status
    ]

    db.query(sql, statement, (err, result) => {
      console.log(statement)
      if (err) return reject({ status: 500, err })
      resolve({
        status: 201,
        result
      })
    })
  })
}

const editVehicle = (id, body) => {
  return new Promise((resolve, reject) => {
    const {
      name,
      description,
      capacity,
      price,
      stock,
      category,
      location,
      status
    } = body

    const sql =
      "UPDATE vehicles SET name = ?, description = ?, capacity = ?, price = ?, stock = ?, category = ?, location = ?, status = ? WHERE id = ?"

    const statement = [
      name,
      description,
      capacity,
      price,
      stock,
      category,
      location,
      status,
      id
    ]

    db.query(sql, statement, (err, result) => {
      if (
        typeof name == "undefined" ||
        name.length == 0 ||
        typeof description == "undefined" ||
        description.length == 0 ||
        typeof capacity == "undefined" ||
        capacity.length == 0 ||
        typeof price == "undefined" ||
        price.length == 0 ||
        typeof stock == "undefined" ||
        stock.length == 0 ||
        typeof category == "undefined" ||
        category.length == 0 ||
        typeof location == "undefined" ||
        location.length == 0 ||
        typeof status == "undefined" ||
        status.length == 0
      )
        if (err == null)
          return reject({ status: 500, message: "Data cannot be empty!" })
      console.log(result)
      resolve({
        status: 200,
        message: "Successfuly changed data",
        result: {
          id,
          name,
          description,
          capacity,
          price,
          stock,
          category,
          location,
          status
        }
      })
    })
  })
}

const deleteVehicle = (id) => {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM vehicles WHERE id = ?"
    db.query(sql, [id], (err, result) => {
      const { affectedRows } = result
      if (err) return reject({ status: 500, err })
      if (affectedRows == 0) return resolve({ status: 404, result })
      resolve({ status: 200 }, result)
    })
  })
}

module.exports = {
  getAllVehicle,
  getVehicleById,
  addVehicle,
  editVehicle,
  deleteVehicle
}
