'use strict';

require('dotenv').config();
const saveData = require('./dynamoDB.js'); 

const YoutubeLoader = require("langchain/document_loaders/web/youtube").YoutubeLoader;
const OpenAIEmbeddings = require("langchain/embeddings/openai").OpenAIEmbeddings;
const RecursiveCharacterTextSplitter = require("langchain/text_splitter").RecursiveCharacterTextSplitter;
const RetrievalQAChain = require("langchain/chains").RetrievalQAChain;
const ChatOpenAI = require("langchain/chat_models/openai").ChatOpenAI;
const MemoryVectorStore = require("langchain/vectorstores/memory").MemoryVectorStore;


function youtubeLinkHandler (youtubeURL) {
  // Extract video id from the URL
  let videoId = youtubeURL.split('v=')[1];
  console.log('sgsfsdfsdf', youtubeURL);
  let ampersandPosition = videoId.indexOf('&');
  if(ampersandPosition != -1) {
    videoId = videoId.substring(0, ampersandPosition);
  }
  const answer = `https://www.youtube.com/watch?v=${videoId}`;
  console.log(answer);
  // return answer;
}

async function handleQuery (queryObject){
  // let youtubeURL = youtubeLinkHandler(queryObject.youtubeURL);
  // console.log('youtubeURL', youtubeURL);
  const youtubeURL = queryObject.youtubeURL;
  const userQuery = queryObject.query;
  const versionNumber = queryObject.versionNumber;
  
  const loader = YoutubeLoader.createFromUrl(youtubeURL, {
    language: "en",
    addVideoInfo: false,
  });

  // // Load the data  
  const data = await loader.load();

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 100,
  });

  // Split the the data into chunks
  const splitDocs = await textSplitter.splitDocuments(data);

  const vectorStore = await MemoryVectorStore.fromDocuments(
    splitDocs,
    new OpenAIEmbeddings()
  );

  const model = new ChatOpenAI({ modelName: "gpt-3.5-turbo" });
  const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever());

  const queryResponse = await chain.call({
    query: userQuery,
  });

  const response = {
    body: queryResponse.text,
    versionNumber: versionNumber,
  };

  const email = 'fan3@sugaraspa.com'; 
  await saveData(email, youtubeURL, userQuery, queryResponse.text); 

  return response;
};

module.exports = handleQuery;