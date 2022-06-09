const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../configs/db");
const { sendForgotPass } = require("../helpers/sendOtp");

const register = (body) => {
  return new Promise((resolve, reject) => {
    const { email } = body;
    const sqlInsert = "INSERT INTO users SET ?";
    const checkEmail = "SELECT email FROM users WHERE email = ?";
    const role = 3;

    db.query(checkEmail, [email], (err, result) => {
      if (err) return reject({ status: 500, err });

      if (result.length !== 0)
        return resolve({
          status: 406,
          result: { message: "Email is already registered" },
        });
      bcrypt
        .hash(body.password, 10)
        .then((hashedPassword) => {
          const bodyWithHashedPassword = {
            ...body,
            password: hashedPassword,
            role,
          };

          db.query(sqlInsert, [bodyWithHashedPassword], (err, result) => {
            if (err) return reject({ status: 500, err });
            const { noHp, email } = body;
            const { insertId } = result;
            resolve({
              status: 201,
              result: {
                account: {
                  id: insertId,
                  email,
                  noHp,
                },
                message: "Registerd Successfuly",
              },
            });
          });
        })
        .catch((err) => {
          reject({ status: 500, err });
        });
    });
  });
};

const login = (body) => {
  return new Promise((resolve, reject) => {
    const { email, password } = body;
    const sqlQuery = `SELECT * FROM users WHERE email = ?`;

    db.query(sqlQuery, [email], (err, result) => {
      if (err) return reject({ status: 500, err });
      // console.log(result)
      const sqlGetPhoto = `SELECT photo from users where id = ?`;

      if (
        typeof email == "undefined" ||
        typeof password == "undefined" ||
        email == "" ||
        password == ""
      )
        return reject({
          status: 401,
          err: "Wrong Email or Password",
        });

      if (result.length == 0)
        return reject({
          status: 401,
          err: "Wrong Email or Password",
        });

      const hash = result[0].password;

      bcrypt.compare(password, hash, (err, resultCompare) => {
        if (err) return reject(err);

        if (!resultCompare)
          return reject({
            status: 401,
            err: "Wrong Email or Password",
          });

        const payload = {
          id: result[0].id,
          email: result[0].email,
          roles: result[0].role,
          photo: result[0].photo,
        };

        const jwtOptions = {
          expiresIn: "1d",
          issuer: process.env.ISSUER,
        };

        jwt.sign(payload, process.env.SECRET_KEY, jwtOptions, (err, token) => {
          const { photo, role } = result[0];
          if (err) return reject({ status: 500, err });
          resolve({
            status: 200,
            result: {
              token,
              photo,
              role,
            },
          });
        });
      });
    });
  });
};

const logout = (token) => {
  return new Promise((resolve, reject) => {
    const statement = [token];
    const sql = "INSERT INTO blacklist values(null,?)";
    db.query(sql, statement, (err, result) => {
      if (err) reject(err);
      resolve({ status: 200, result: { message: "Logout Success" } });
    });
  });
};

const getOtp = (body) => {
  return new Promise((resolve, reject) => {
    const { email } = body;
    const sqlQuery = `SELECT * FROM users WHERE email = ?`;

    db.query(sqlQuery, [email], (err, result) => {
      if (err) {
        console.log(err);
        return reject({
          status: 500,
          err: { msg: "Something went wrong", data: null },
        });
      }
      if (result.length == 0)
        return reject({
          status: 401,
          err: { msg: "Email is invalid", data: null },
        });
      const name = result[0].name;
      const otp = Math.ceil(Math.random() * 1000 * 1000);
      const sqlQuery = `UPDATE users SET otp = ? WHERE email = ?`;

      db.query(sqlQuery, [otp, email], (err) => {
        if (err)
          return reject({
            status: 500,
            err: { msg: "Something went wrong", data: null },
          });

        sendForgotPass(email, { name: name, otp })
          .then((res) => {
            console.log("RES NODEMAILER", res);
          })
          .catch((err) => {
            console.log("ERROR NODEMAILER", err);
          });
        const data = {
          email: email,
        };
        resolve({
          status: 200,
          result: {
            msg: "Please check your email bro",
            data,
          },
        });
      });
    });
  });
};

const checkOtp = (body) => {
  return new Promise((resolve, reject) => {
    const { email, otp } = body;
    const sqlQuery = `SELECT email, otp FROM users WHERE email = ? AND otp = ?`;
    db.query(sqlQuery, [email, otp], (err, result) => {
      if (err) return reject({ status: 500, err });

      if (result.length === 0)
        return reject({ status: 401, err: { msg: "Invalid OTP" } });
      const data = {
        email: email,
      };
      resolve({ status: 200, result: { msg: "OTP is valid", data } });
    });
  });
};

const resetPassword = (body) => {
  return new Promise((resolve, reject) => {
    const { email, password, otp } = body;
    const sqlQuery = `SELECT * FROM users WHERE email = ? AND otp = ?`;

    db.query(sqlQuery, [email, otp], (err) => {
      if (err)
        return reject({
          status: 500,
          err: { msg: "Something went wrong", data: null },
        });

      bcrypt
        .hash(password, 10)
        .then((hashedPassword) => {
          const sqlUpdatePass = `UPDATE users SET password = ?, otp = null WHERE email = ? AND otp = ?`;
          db.query(sqlUpdatePass, [hashedPassword, email, otp], (err) => {
            if (err) {
              return reject({
                status: 500,
                err: { msg: "Something went wrong", data: null },
              });
            }
            console.log("EMAIL", email);
            return resolve({
              status: 200,
              result: {
                msg: "Reset password success",
                data: {
                  email,
                },
              },
            });
          });
        })
        .catch((err) => {
          console.log(err);
          reject({ status: 500, err: { err: "masuk error" } });
        });
    });
  });
};

module.exports = { register, login, logout, getOtp, checkOtp, resetPassword };
