'use strict';

const validator = (req, res, next) => {
  let name = req.query.name;
  let method = req.method;
  let path = req.path;

  if (path !== "/queryvideo") {
    // console.log('bad route')
    next({ code: 404, message: 'Bad Route. The route is incorrect.' })
  // } else if (!name) {
    // next({ code: 400, message: 'No Name. There was no name passed.'});
  } else if (method !== 'POST') {
    next({ code: 405, message: 'Method Not Allowed. This is POST only method.'});
  } else {
    next();
  }

  // } else if (!method) {
  //   next({error: '500', message: 'validator.js: BAD METHOD' }); 
  //   next({error: '400. No Name', message: 'validator.js: There was no name passed.'});
  // } else if (!name){
  // } else {
  //   next();
  // }
}

module.exports = validator;