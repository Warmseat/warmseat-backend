'use strict';

const serverError = (err, req, res, next) => {
  // console.log("500.js: AN ERROR OCCURRED!", err);
  console.log('500.js called');
  console.log(err.error, err.message)
  res.status(500).json({ message: err.message });
};

module.exports = serverError;