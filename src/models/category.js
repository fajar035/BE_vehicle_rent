const { reject } = require("bcrypt/promises");
const db = require("../configs/db");

const getCategory = () => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM category`;
    db.query(sql, (err, result) => {
      if (err) return reject({ status: 500, err });
      resolve({ status: 200, result });
    });
  });
};

const newCategory = (body) => {
  return new Promise((resolve, reject) => {
    const { category } = body;

    if (category === undefined || category.length === 0) {
      return reject({
        status: 400,
        err: {
          result: {
            message: "Input cannot be empty",
          },
        },
      });
    }

    const sql2 = `SELECT * FROM category`;
    db.query(sql2, (err, result) => {
      if (err) return reject({ status: 500, err });
      // console.log(Object.values(result));

      let categoryArr = [];
      for (let i = 0; i < result.length; i++) {
        // console.log(Object.values(result[i]));
        const category = Object.values(result[i]);
        // console.log(category[1]);
        categoryArr.push(category[1]);
      }

      const checkCategory = (filter) => {
        return filter === category;
      };

      const checkBody = categoryArr.filter(checkCategory);

      if (checkBody.length !== 0)
        return reject({
          status: 400,
          err: {
            result: { message: "Categories already available" },
          },
        });

      const sql = `INSERT INTO category VALUES(null, ?)`;
      const statement = [category];
      db.query(sql, statement, (err, result) => {
        if (err) return reject({ status: 500, err });
        resolve({
          status: 201,
          result: {
            id: result.insertId,
            category,
            message: "Successfully added category",
          },
        });
      });
    });
  });
};

const deleteCategory = (id) => {
  return new Promise((resolve, reject) => {
    const sql = `DELETE FROM category WHERE id = ?`;
    const checkId = id * 2;
    if (isNaN(checkId))
      return reject({
        status: 400,
        err: {
          result: {
            message: "Please fill in the correct id",
          },
        },
      });
    db.query(sql, [id], (err, result) => {
      const { affectedRows } = result;
      if (err) return reject({ status: 500, err });
      if (affectedRows === 0)
        return reject({
          status: 404,
          err: {
            result: { id: id, message: "Data not found" },
          },
        });
      resolve({
        status: 200,
        result: {
          result: {
            id: id,
            message: "Category successfully deleted",
          },
        },
      });
    });
  });
};

module.exports = { getCategory, newCategory, deleteCategory };
