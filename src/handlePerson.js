'use strict';

const handlePerson = (req, res, next) => {
  res.json( { name: req.query.name} );
}

module.exports = handlePerson;