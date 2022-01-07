/* eslint-disable no-console */
require('dotenv').config();
const cors = require('cors');
const { join } = require('path');
const express = require('express');
const { connect } = require('mongoose');
const { createServer } = require('http');
const { routes } = require('./src/routes');
const { mongoDBURL, serverPort, DataBaseOptions, errorHandler } = require('./src/config');

// Application initialization
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(join(__dirname, '/src/public')));

routes.forEach((item) => {
    app.use(`/api/${item}`, require(`./src/routes/${item}`));
});

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

// Database settings
connect(mongoDBURL, DataBaseOptions).then(
    () => { console.log('MongoDB connection successful'); },
    (err) => { errorHandler(err); },
);

// Starting and listening
createServer({}, app).listen(serverPort, () => {
    console.log(`Server running at localhost:${serverPort}`);
});
