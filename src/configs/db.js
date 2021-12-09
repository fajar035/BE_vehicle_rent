const mysql = require("mysql")

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USERNAME,
  password: process.env.PASS,
  database: process.env.DB
})

// cek koneksi
db.connect((err) => {
  if (err) return console.log(`${err}`)
  return console.log("Connected Database")
})

module.exports = db
