const success = (res, status, data) => {
  res.status(status).json(data);
};

const fail = (res, status, data) => {
  res.status(status).json(data);
};

module.exports = { success, fail };
