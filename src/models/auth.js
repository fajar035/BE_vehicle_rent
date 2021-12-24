const bcrypt = require("bcrypt")
const res = require("express/lib/response")
const jwt = require("jsonwebtoken")

const db = require("../configs/db")

const register = (body) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = "INSERT INTO account SET ?"
    bcrypt
    .hash(body.password, 10)
    .then((hashedPassword) => {
      const bodyWithHashedPassword = {
        ...body,
        password: hashedPassword
      }
      db.query(sqlQuery, [bodyWithHashedPassword], (err, result) => {
        if (err) return reject({ status: 500, err })
          resolve({ status: 201, result })
      })
    })
    .catch((err) => {
      reject({ status: 500, err })
    })
  })
}

const login = (body) => {
  return new Promise((resolve, reject) => {
    const { email, password } = body

    const sqlQuery = `SELECT * FROM account WHERE email = ?`
    db.query(sqlQuery, [email], (err, result) => {
      if (err) return reject({ status: 500, err })

        if (result.length == 0)
          return reject({ status: 401, err: "Wrong email or Password" })

        const hash = result[0].password
        bcrypt.compare(password, hash, (err, res) => {
          if (err) return reject(err)
            console.log(res)

          const payload = {
            id: result[0].id,
            email: result[0].email,
            level: result[0].levels
          }

          const jwtOptions = {
            expiresIn: "5m",
            issuer: process.env.ISSUER
          }

          jwt.sign(payload, process.env.SECRET_KEY, jwtOptions, (err, token) => {
            if (err) return reject({ status: 500, err })
              resolve({
                status: 200,
                result,
                token
              })
          })
        })
      })
  })
}

module.exports = { register, login }
