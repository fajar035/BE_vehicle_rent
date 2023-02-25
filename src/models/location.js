const db = require("../configs/db")

const getLocation = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM location"
    db.query(sql, (err, result) => {
      console.log("RESULT-LOCATION", result)
      if (err) return reject({ status: 500, err })
      return resolve({ status: 200, result })
    })
  })
}

module.exports = { getLocation }
