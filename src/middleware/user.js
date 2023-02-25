const db = require("../configs/db")
const resHelper = require("../helpers/response")

const getUser = (req, res, next) => {
  const { id } = req.userInfo
  const sql =
    "SELECT id, name, gender,email,dob, nohp, address, photo FROM users WHERE id = ?"

  db.query(sql, [id], (err, result) => {
    if (err) resHelper.fail(res, { err })
    // console.log("RESULT", result[0])

    const getUserDB = result[0]
    // console.log("BODY-OLD", getUserDB)
    const { id, name, gender, email, dob, nohp, address, photo } = getUserDB

    const d = new Date(dob)
    const date = d.toString()

    function convert(str) {
      const date = new Date(str)
      const mnth = ("0" + (date.getMonth() + 1)).slice(-2)
      const day = ("0" + date.getDate()).slice(-2)
      return [date.getFullYear(), mnth, day].join("-")
    }

    const date0 = convert(date)

    const formatDate = (date) => {
      const dateStr = date.split("-")
      return dateStr[2] + "-" + dateStr[1] + "-" + dateStr[0]
    }

    const dateNew = formatDate(date0)

    const bodyOld = {
      id: id,
      nameOld: name,
      genderOld: gender,
      emailOld: email,
      dobOld: dateNew,
      noHpOld: nohp,
      addressOld: address,
      photoOld: photo
    }
    // console.log("BODY-OLD", bodyOld)

    req.bodyOld = bodyOld
    // console.log("REQUEST-BODY-OLD", req.bodyOld)
    next()
  })
}

module.exports = {
  getUser
}
