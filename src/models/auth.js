const bcrypt = require("bcrypt")
const { reject } = require("bcrypt/promises")
// const res = require("express/lib/response")
const jwt = require("jsonwebtoken")
const db = require("../configs/db")

const register = (body) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = "INSERT INTO users SET ?"
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

    // if (
    //   typeof email == "undefined" ||
    //   typeof password == "undefined" ||
    //   email == "" ||
    //   password == ""
    // )
    //   reject({ status: 401, err: "Wrong Email or Password" })

    const sqlQuery = `SELECT * FROM users WHERE email = ?`
    db.query(sqlQuery, [email], (err, result) => {
      if (err) return reject({ status: 500, err })

      if (result.length == 0)
        return reject({ status: 401, err: "Wrong Email or Password" })

      const hash = result[0].password

      bcrypt.compare(password, hash, (err, resultCompare) => {
        if (err) return reject(err)

        if (!resultCompare)
          return reject({ status: 401, err: "Wrong Email or Password" })

        const payload = {
          id: result[0].id,
          email: result[0].email,
          roles: result[0].role
        }

        const jwtOptions = {
          expiresIn: "5m",
          issuer: process.env.ISSUER
        }

        jwt.sign(payload, process.env.SECRET_KEY, jwtOptions, (err, token) => {
          if (err) return reject({ status: 500, err })
          resolve({
            status: 200,
            token,
            result
          })
        })
      })
    })
  })
}

const logout = (token) => {
  return new Promise((resolve, reject) => {
    const statement = [token]
    const sql = "INSERT INTO blacklist values(null,?)"
    db.query(sql, statement, (err, result) => {
      if (err) reject(err)
      resolve({ status: 200, result: { message: "Logout Success" } })
    })
  })
}

module.exports = { register, login, logout }