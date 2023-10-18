const dotenv = require('dotenv');
const YoutubeLoader = require("langchain/document_loaders/web/youtube").YoutubeLoader;
const OpenAIEmbeddings = require("langchain/embeddings/openai").OpenAIEmbeddings;
// const FaissStore = require("langchain/vectorstores/faiss").FaissStore;
const RecursiveCharacterTextSplitter = require("langchain/text_splitter").RecursiveCharacterTextSplitter;
const RetrievalQAChain = require("langchain/chains").RetrievalQAChain;
const ChatOpenAI = require("langchain/chat_models/openai").ChatOpenAI;
const MemoryVectorStore = require("langchain/vectorstores/memory").MemoryVectorStore;

// const Document = require("langchain/document").Document;
dotenv.config();

async function handleQuery (queryObject){
  // console.log('queryVideo: ', versionNumber);
  // console.log('heres the data!: ', queryObject);

  let youtubeURL = queryObject.youtubeURL;
  let userQuery = queryObject.query;
  let versionNumber = queryObject.versionNumber;
  
//  console.log('youtubeURL: ', youtubeURL + '. userQuery: ', userQuery);


  // test idea: if the youtube video does not support transcript, then return a message saying so
  // try catch block begin
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
    // statusCode: 200,
    // body: JSON.stringify('Answer ', queryResponse),
    body: queryResponse.text,
    versionNumber: versionNumber,
    // answer: queryResponse.text
    // body: JSON.stringify('URL: ' + youtubeURL + '. Query: ' + userQuery),
  };
  console.log(response);
  return response;
};

module.exports = handleQuery;