const authModel = require("../models/auth")
const resHelper = require("../helpers/response")

const register = (req, res) => {
  const { body } = req
  authModel
    .register(body)
    .then(({ status, result }) => {
      return resHelper.success(res, status, result)
    })
    .catch(({ status, err }) => {
      resHelper.fail(res, status, err)
    })
}

const login = (req, res) => {
  const { body } = req
  authModel
    .login(body)
    .then(({ status, token }) => {
      resHelper.success(res, status, { token: token })
    })
    .catch(({ status, err }) => {
      res.status(status).json({ err })
    })
}

const logout = (req, res) => {
  const token = req.header("x-access-token")
  const { userInfo } = req
  console.log(userInfo)
  authModel
    .logout(token)
    .then(({ status, result }) => {
      res.status(status).json({ result })
    })
    .catch((err) => {
      res.status(err).json({ err })
    })
}

module.exports = { register, login, logout }
