const cors = require('cors');
const express = require('express');
const { connect } = require('mongoose');
const { createServer } = require('http');
const { routes } = require('./src/routes');

require('dotenv').config();
const { MongoDB_URL, DataBaseOptions, errorHandler } = require('./src/config');
const serverPort = process.env.Server_PORT;

// Application initialization
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + '/src/public'));

routes.forEach(item => {
  app.use(`/api/${item}`, require(`./src/routes/${item}`));
});

app.get('/', (req, res) => {
  res.sendFile('index.html');
})

// Database settings
connect(MongoDB_URL, DataBaseOptions).then(
  () => {  console.log('MongoDB connection successful');  },
  (err) => {  errorHandler('MongoDB connection unsuccessful', err);  }
);

// Starting and listening
createServer({}, app).listen(serverPort, () => {
  console.log(`Server running at localhost:${serverPort}`);
});
