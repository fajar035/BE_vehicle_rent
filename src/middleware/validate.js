const jwt = require("jsonwebtoken")

const register = (req, res, next) => {
  const { body } = req
  const registerBody = [
    "firstname",
    "lastname",
    "gender",
    "email",
    "phone_number",
    "DoB",
    "address",
    "password",
    "role_id"
  ]
  const bodyProperty = Object.keys(body)
  const isBodyValid =
    registerBody.filter((property) => !bodyProperty.includes(property))
      .length == 0
  if (!isBodyValid) return res.status(500).json({ pesan: "invalid body" })
  next()
}

const login = (req, res, next) => {
  const { body } = req
  const loginBody = ["email", "password"]
  const bodyProperty = Object.keys(body)
  const isBodyValid =
    loginBody.filter((property) => !bodyProperty.includes(property)).length == 0
  if (!isBodyValid)
    return res.status(500).json({ pesan: "harus mengisi email dan password" })
  next()
}

const token = (roles) => {
  return (req, res, next) => {
    const { token } = req.headers
    if (token.length == 0)
      return res
        .status(401)
        .json({ pesan: "harus memiliki token untuk mengakses endpoint ini" })
    jwt.verify(token, process.env.JWT_KEYS, (err, payload) => {
      if (err) return res.status(403).json({ err })
      console.log(roles)
      if (roles != payload.role)
        return res
          .status(401)
          .json({ pesan: "anda tidak memiliki akses untuk endpoint ini" })
    })
    next()
  }
}

module.exports = { register, login, token }
