const authModel = require("../models/auth")

const register = (req, res) => {
  const { body } = req
  authModel
    .register(body)
    .then(({ status, result }) => {
      const { email, levels } = body
      const response = {
        message: "Register succesccfuly",
        result: {
          email,
          levels,
          id: result.insertId
        }
      }
      // console.log(err)
      return res.status(status).json(response)
    })
    .catch(({ status, err }) => {
      console.log(status, err)
      return res.status(status).json({ err })
    })
}

const login = (req, res) => {
  const { body } = req
  authModel
    .login(body)
    .then(({ status, token }) => {
      res.status(status).json({
        result: {
          token: token
        }
      })
    })
    .catch(({ status, err }) => {
      res.status(status).json({ err })
    })
}

module.exports = { register, login }
