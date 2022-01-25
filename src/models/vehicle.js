/* eslint-disable indent */
const mysql = require("mysql")
const db = require("../configs/db")

const getAllVehicle = (keyword, query, keywordFilter) => {
  return new Promise((resolve, reject) => {
    let sql =
      "SELECT vehicles.id, vehicles.name, vehicles.description, vehicles.capacity, vehicles.price,vehicles.stock, vehicles.photo, category.category, location.location, status.status FROM vehicles JOIN category ON vehicles.id_category = category.id JOIN location ON vehicles.id_location = location.id JOIN status ON vehicles.id_status = status.id"
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

    if (keywordFilter.length !== 0) {
      sql += " WHERE category.category = ?"
      statement.push(mysql.raw(keywordFilter))
    }

    // if(keywordPopular.length !== 0){
    //   sql += " WHERE category.category = ?"
    //   statement.push(mysql.raw(keywordFilter))

    // }

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
          : `/vehicles?by=id&order=asc&page=${page + 1}&limit=${limit}`,
        prev: isNaN(limit)
          ? null
          : page == 1 || page == 0
          ? null
          : `/vehicles?by=id&order=asc&page=${page - 1}&limit=${limit}`,
        totalPage,
        count
      }

      db.query(sql, statement, (err, result) => {
        if (err) return reject({ status: 500, err })
        if (result.length == 0)
          return resolve({
            status: 400,
            result: { data: "Data not found", result }
          })
        resolve({ status: 200, result: result, meta })
      })
    })
  })
}

const getVehicleById = (id) => {
  return new Promise((resolve, reject) => {
    const sql =
      "select vehicles.id, vehicles.name, vehicles.description, vehicles.capacity, vehicles.price, vehicles.stock, vehicles.photo, category.category, location.location, status.status from vehicles join category on vehicles.id_category = category.id join location on vehicles.id_location = location.id join status on vehicles.id_status = status.id where vehicles.id = ?"
    db.query(sql, [id], (err, result) => {
      if (err) return reject({ status: 500, err })
      if (result.length == 0) return resolve({ status: 404, result })
      resolve({ status: 200, result: result })
    })
  })
}

const addVehicle = (body, inputPhoto) => {
  return new Promise((resolve, reject) => {
    // console.log("BODY", body)
    // console.log("PHOTO", inputPhoto)

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
      inputPhoto,
      category,
      location,
      status
    ]

    db.query(sql, statement, (err, result) => {
      // console.log(statement)
      if (err) return reject({ status: 500, err })
      resolve({
        status: 201,
        result: {
          name: name,
          description: description,
          capacity: capacity,
          price: price,
          stock: stock,
          photos: JSON.parse(inputPhoto),
          category: category,
          location: location,
          status: status
        }
      })
    })
  })
}

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
      photos
    } = body
    console.log("PHOTOS", photos)

    const {
      nameOld,
      descriptionOld,
      capacityOld,
      priceOld,
      stockOld,
      photoOld,
      id_categoryOld,
      id_locationOld,
      id_statusOld
    } = bodyOld
    console.log("PHOTO-OLD", photoOld)
    if (!name) {
      name = nameOld
    }
    if (!description) {
      description = descriptionOld
    }
    if (!capacity) {
      capacity = capacityOld
    }
    if (!price) {
      price = priceOld
    }
    if (!stock) {
      stock = stockOld
    }
    if (!photos) {
      photos = photoOld
    }
    if (!category) {
      category = id_categoryOld
    }
    if (!location) {
      location = id_locationOld
    }
    if (!status) {
      status = id_statusOld
    }

    const sql =
      "UPDATE vehicles SET name = ?, description = ?, capacity = ?, price = ?, stock = ?, photo = ?, id_category = ?, id_location = ?, id_status = ? WHERE id = ?"
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
      id
    ]
    console.log("STATEMENT", statement)
    db.query(sql, statement, (err, result) => {
      if (err) return reject({ status: 500, err })
      console.log("ERROR", err)
      console.log("RESULT", result)
      const { affectedRows } = result
      if (affectedRows == 0) return resolve({ status: 404, result })
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
          status: status
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

const getPhotoVehicle = (images, id) => {
  return new Promise((resolve, reject) => {
    console.log("id", id)
    const sql = `SELECT photo FROM vehicles WHERE id = ?`
    db.query(sql, [id], (err, result) => {
      console.log(result)
      if (err) return reject({ status: 500, err })
      return resolve({ status: 200, result })
    })
  })
}

const uploadPhotoVehicle = (namePhotos, id) => {
  return new Promise((resolve, reject) => {
    // console.log(namePhotos)
    const photos = namePhotos.map((item) => {
      const filePath = `/vehicles/photo/${item}`
      return filePath
    })
    const inputPhoto = JSON.stringify(photos)

    const sql = `UPDATE vehicles SET photo = ? WHERE id = ?`

    db.query(sql, [inputPhoto, id], (err, result) => {
      if (err) return reject({ status: 500, err })
      // console.log(result)
      resolve({
        status: 200,
        result: { id: id, result: JSON.parse(inputPhoto) }
      })
    })
  })
}

module.exports = {
  getAllVehicle,
  getVehicleById,
  addVehicle,
  editVehicle,
  deleteVehicle,

  getPhotoVehicle,
  uploadPhotoVehicle
}
