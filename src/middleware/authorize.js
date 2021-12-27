const jwt = require("jsonwebtoken")
const db = require("../configs/db")
const resHelper = require("../helpers/response")

const checkToken = (req, res, next) => {
  const token = req.header("x-access-token")
  const jwtOptions = {
    issuer: process.env.ISSUER
  }
  const sql = "SELECT token FROM blacklist WHERE token = ?"
  db.query(sql, [token], (err, result) => {
    if (err)
      return resHelper.fail(res, 403, { message: "login your account first." })
    if (result.length !== 0)
      return resHelper.success(res, 403, {
        message: "login your account first."
      })

    jwt.verify(token, process.env.SECRET_KEY, jwtOptions, (err, payload) => {
      if (err)
        return resHelper.fail(res, 403, {
          message: "login your account first."
        })

      const { id, email, roles } = payload
      req.userInfo = { id, email, roles }
      next()
    })
  })
}

module.exports = { checkToken }
