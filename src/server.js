'use strict';

const versionNumber = 'v0.9.1';

const express = require('express');
const cors = require('cors');
const app = express();
// const authorize = require('./auth/authorize.js');

app.use(cors());
app.use(express.json());
// app.use(authorize);

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