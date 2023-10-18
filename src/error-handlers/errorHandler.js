'use strict';

const errorHandler = (err, req, res, next) => {
  // console.log("500.js: AN ERROR OCCURRED!", err);
  let code = err.code;
  // console.log('errorHandler.js: ', code, err.message)
  res.status(code).json({ message: err.message });
};

module.exports = errorHandler;