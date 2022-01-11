const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const db = require("../configs/db")

const register = (body) => {
  return new Promise((resolve, reject) => {
    const { email } = body
    const sqlInsert = "INSERT INTO users SET ?"
    const checkEmail = "SELECT email FROM users WHERE email = ?"
    const role = 3

    db.query(checkEmail, [email], (err, result) => {
      if (err) return reject({ status: 500, err })

      if (result.length !== 0)
        return resolve({
          status: 501,
          result: { message: "Email is already registered" }
        })
      bcrypt
        .hash(body.password, 10)
        .then((hashedPassword) => {
          const bodyWithHashedPassword = {
            ...body,
            password: hashedPassword,
            role
          }

          db.query(sqlInsert, [bodyWithHashedPassword], (err, result) => {
            if (err) return reject({ status: 500, err })
            const { name, email } = body
            const { insertId } = result
            resolve({
              status: 201,
              result: {
                account: {
                  id: insertId,
                  name,
                  email
                },
                message: "Registerd Successfuly"
              }
            })
          })
        })
        .catch((err) => {
          reject({ status: 500, err })
        })
    })
  })
}

const login = (body) => {
  return new Promise((resolve, reject) => {
    const { email, password } = body
    const sqlQuery = `SELECT * FROM users WHERE email = ?`

    db.query(sqlQuery, [email], (err, result) => {
      if (err) return reject({ status: 500, err })
      console.log(result)
      const sqlGetPhoto = `SELECT photo from users where id = ?`

      if (
        typeof email == "undefined" ||
        typeof password == "undefined" ||
        email == "" ||
        password == ""
      )
        return reject({
          status: 401,
          err: "Wrong Email or Password"
        })

      if (result.length == 0)
        return reject({
          status: 401,
          err: "Wrong Email or Password"
        })

      const hash = result[0].password

      bcrypt.compare(password, hash, (err, resultCompare) => {
        if (err) return reject(err)

        if (!resultCompare)
          return reject({
            status: 401,
            err: "Wrong Email or Password"
          })

        const payload = {
          id: result[0].id,
          email: result[0].email,
          roles: result[0].role
        }

        const jwtOptions = {
          expiresIn: "1d",
          issuer: process.env.ISSUER
        }

        jwt.sign(payload, process.env.SECRET_KEY, jwtOptions, (err, token) => {
          if (err) return reject({ status: 500, err })
          resolve({
            status: 200,
            result: {
              token
            }
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
