const db = require("../configs/db")

const getStatus = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM status"

    db.query(sql, (err, result) => {
      if (err) reject({ status: 500, err })
      return resolve({ status: 200, result })
    })
  })
}

module.exports = { getStatus }
