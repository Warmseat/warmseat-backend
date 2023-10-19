'use strict';

const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({
  region: process.env.AWS_REGION,
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();

async function saveData(email, video, query, response) {
  let getParams = {
    TableName: 'warmseat',
    Key: {
      'email': email,
    }
  };
  let userData

  try {
    userData = await dynamoClient.get(getParams).promise();
  } catch (error) {
    console.error("Error getting data from DynamoDB:", error);
    throw error;
  }

  // If the user doesn't exist, initialize an empty videos array
  if (!userData.Item) {
    userData.Item = {
      videos: []
    };
  }
  // Add the new video to the videos array
// Find the video in the videos array
let videoItem = userData.Item.videos.find(v => v.url === video);

// If the video exists, add the new query and response to its queries array
if (videoItem) {
  videoItem.queries.push({
    query: query,
    response: response,
    "pinecone": "pinecone edge placeholder"
  });
} else {
  // If the video doesn't exist, add a new video to the videos array
  userData.Item.videos.push({
    url: video,
    queries: [{
      query: query,
      response: response,
      "pinecone": "pinecone edge placeholder"
    }]
  });
}  
  let putParams = {
    TableName: 'warmseat',
    Item: userData.Item
  };
  
dynamoClient.put(putParams, function(err, data) {
    if (err) {
      console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
      throw err; // Throw the error to stop execution and help identify the issue
    } else {
      console.log("Added item:", JSON.stringify(data, null, 2));
    }
  });
}

module.exports = saveData;