'use strict';

const fourOhFour = (req, res, next) => {
  let method = req.method;

  if (method !== 'GET') {
    // If the method is not GET, return a 405 (Method Not Allowed) status code
    res.status(405).send({ error: '405. Method Not Allowed', message: '404.js: The requested method is not allowed on this server.' });
  } else {
    console.log('404 discovered');
    res.status(404).send({ error: '404. Not Found', message: '404.js: The requested route could not be found on this server.' });
  }

  if (req.error) {
    console.log('error logger invoked.')
    res.status(404).send(req.error);
  }

}

module.exports = fourOhFour;