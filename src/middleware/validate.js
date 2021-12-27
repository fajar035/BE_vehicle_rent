const resHelper = require("../helpers/response")

const validateLogin = (req, res, next) => {
  // console.log(res  )
  const { email, password } = req.body

  if (!email || email == "" || !password || password == "")
    return resHelper.fail(res, 400, { err: "Wrong input!" })
  next()
}

module.exports = { validateLogin }
