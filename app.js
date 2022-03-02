const express = require("express"); // web framework
const fetch = require("node-fetch"); // for making AJAX requests
const path = require("path");
const Moralis = require("moralis");
// put environmental variables defined in .env file on process.env
require("dotenv").config();

// const serverUrl = process.env.SERVER_URL;
// console.log(serverUrl);
// const appId = process.env.APPLICATION_ID;
// Moralis.start({ serverUrl, appId });
// let currentAmtCards = 0;





// async function getCollectionData(collection, sortedBy, currentAmtCards) {
//   const query = new Moralis.Query(collection);
//   query.ascending(sortedBy);
//   const topNFTs = query.skip(currentAmtCards).limit(48);
//   const results = await topNFTs.find();
//   console.log(results);

//   let collectionData = [];
//   for (let i = 0; i < Object.keys(results).length; i++) {
//     let key = Object.keys(results)[i];
//     collectionData.push(results[key]);
//   }
//   console.log(collectionData);
//   console.log("getCollection() complete");
//   return collectionData;
// }

const app = express();

// serve files / assets from the dist folder
app.use(express.static("dist"));

// in response to `GET /` requests, send the file `dist/index.html`
app.get("/", (request, response) => {
  response.sendFile(`${__dirname}/dist/index.html`);
});

// Heroku sets process.env.PORT in production; use 8000 in dev
const PORT = process.env.PORT || 8000;
// start up a server listening at PORT; on success, log a message
app.listen(PORT, () => {
  console.log(`Listening at localhost:${PORT}`);
});

app.get("/api", (req, res) => {
  const serverUrl = process.env.SERVER_URL;
  console.log(serverUrl);
  const appId = process.env.APPLICATION_ID;
  console.log(appId);
  return { serverUrl: serverUrl, appId: appId };
});
