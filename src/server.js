'use strict';

const versionNumber = 'v0.9.91';

// const CognitoExpress = require("cognito-express");

// const cognitoExpress = new CognitoExpress({
// 	region: "us-west-2",
// 	cognitoUserPoolId: "us-west-2_f4IUtL299",
// 	tokenUse: "access",
// 	tokenExpiration: 3600000
// });


const express = require('express');
const cors = require('cors');
const app = express();
// const authorize = require('./auth/authorize.js');

app.use(cors());
app.use(express.json());
// app.use(authorize);
// app.use(function(req, res, next) {
// 	let accessTokenFromClient = req.headers.accesstoken;
// 	if (!accessTokenFromClient) return res.status(401).send("Access Token missing from header");

// 	cognitoExpress.validate(accessTokenFromClient, function(err, response) {
// 		if (err) return res.status(401).send(err);
// 		res.locals.user = response;
// 		next();
// 	});
// });


const logger = require('./middleware/logger.js');
const validator = require('./middleware/validator.js')
const errorHandler = require('./error-handlers/errorHandler');
const handleQuery = require('./queryvideo.js');

app.use(logger); // logger middleware
app.use(validator); // validator middleware

app.post('/queryvideo', async (req, res) => {
  try {
    let query = req.body.query;
    let youtubeURL = req.body.youtubeURL;

    const queryObject = {
      query,
      versionNumber: versionNumber,
      youtubeURL
    }

    let openAIResponse = await handleQuery(queryObject);
    res.status(200).send(openAIResponse);
  } catch (e) {
    if (e.message.includes('Transcript is disabled on this video')) {
      res.status(500).send('Sorry, this video does not support transcript. Please try another video');
    } else {
      res.status(500).send(e);
    }
  }
});


app.use(errorHandler);

module.exports = {
  app,
  start: (port) => {
    app.listen(port, () => {
      console.log('Server is running ' + versionNumber + ' on ' + port);
    });
  }
};

exports.module = app;