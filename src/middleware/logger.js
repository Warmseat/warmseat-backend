'use strict';

const logger = (req, res, next) => {
  console.log('logger.js: REQUEST METHOD: ' + req.method);
  console.log('logger.js: REQUEST PATH: ' + req.path);
  // console.log('logger.js: REQUEST QUERY:', req.query);
  next();
}

module.exports = logger;