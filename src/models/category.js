const db = require("../configs/db")

const getCategory = () => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM category`
    db.query(sql, (err, result) => {
      if (err) return reject({ status: 500, err })
      resolve({ status: 200, result })
    })
  })
}

module.exports = { getCategory }
