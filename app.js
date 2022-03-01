// const express = require('express'); // web framework
// const fetch = require('node-fetch'); // for making AJAX requests
// const path = require('path');


// put environmental variables defined in .env file on process.env
require('dotenv').config(); 
// import {config} from './dotenv'

const app = express();
// serve files / assets from the dist folder
app.use(express.static('dist')); 

// in response to `GET /` requests, send the file `dist/index.html`
app.get('/', (request, response) => {
  response.sendFile(`${__dirname}/dist/index.html`);
});

// Heroku sets process.env.PORT in production; use 8000 in dev
const PORT = process.env.PORT || 8000;
// start up a server listening at PORT; on success, log a message
app.listen(PORT, () => {
  console.log(`Listening at localhost:${PORT}`);
});







