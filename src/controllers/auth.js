const authModel = require("../models/auth")

const register = (req, res) => {
  const { body } = req
  authModel
    .register(body)
    .then(({ status, result }) => {
      const { email, levels } = body
      const response = {
        email,
        levels,
        id: result.insertId
      }

      return res.status(status).json(response)
    })
    .catch(({ status, err }) => {
      // console.log(status, err)
      return res.status(status).json({ err })
    })
}

const login = (req, res) => {
  const { body } = req
  authModel
    .login(body)
    .then(({ status, result }) => {
      res.status(status).json({ result })
    })
    .catch(({ status, err }) => {
      res.status(status).json({ err })
    })
}

module.exports = { register, login }
