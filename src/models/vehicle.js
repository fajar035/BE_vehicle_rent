const mysql = require("mysql")
const db = require("../configs/db")

// get all vehicle, by order id & name
const getAllVehicle = (query) => {
  return new Promise((resolve, reject) => {
    console.log(query)
    let sql = "SELECT * FROM vehicles"
    const statement = []
    const order = query.order
    let orderBy = ""
    if (query.by && query.by.toLowerCase() == "id") orderBy = "id"
    if (query.by && query.by.toLowerCase() == "name") orderBy = "name"
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

// get vehicle by id
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

// add new vehicle
const addVehicle = (body) => {
  return new Promise((resolve, reject) => {
    const {
      name,
      category,
      location,
      description,
      price,
      status,
      stock,
      photo
    } = body

    const sql = "INSERT INTO vehicles VALUES(null, ?,?,?,?,?,?,?,?)"

    const statement = [
      name,
      category,
      location,
      description,
      price,
      status,
      stock,
      photo
    ]

    db.query(sql, statement, (err, result) => {
      if (err) return reject({ status: 500, err })
      resolve({
        status: 201,
        result: {
          name,
          category,
          location,
          description,
          price,
          status,
          stock,
          photo
        }
      })
    })
  })
}

// edit vehicle
const editVehicle = (id, body) => {
  return new Promise((resolve, reject) => {
    const {
      name,
      category,
      location,
      description,
      price,
      status,
      stock,
      photo
    } = body

    const sql =
      "UPDATE vehicles SET name = ?, category = ?, location = ?, description = ?, price = ?, status = ?, stock = ?, photo = ?"

    const statement = [
      name,
      category,
      location,
      description,
      price,
      status,
      stock,
      photo
    ]

    db.query(sql, statement, (err, result) => {
      if (
        typeof name == "undefined" ||
        name.length == 0 ||
        typeof category == "undefined" ||
        category.length == 0 ||
        typeof location == "undefined" ||
        location.length == 0 ||
        typeof description == "undefined" ||
        description.length == 0 ||
        typeof price == "undefined" ||
        price.length == 0 ||
        typeof status == "undefined" ||
        status.length == 0 ||
        typeof stock == "undefined" ||
        stock.length == 0 ||
        typeof photo == "undefined" ||
        photo.length == 0
      )
        if (err == null)
          return reject({ status: 500, message: "Data cannot be empty!" })

      resolve({ status: 200, result })
    })
  })
}

// delete Vehicle
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
