/* eslint-disable no-console */
require('dotenv').config();
const cors = require('cors');
const { join } = require('path');
const express = require('express');
const { connect } = require('mongoose');
const { createServer } = require('http');
const router = require('./routes');
const { mongoUrlConnect, serverPort, DataBaseOptions, errorHandler } = require('./config');

// Application initialization
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(join(__dirname, '../public')));
app.use(router);

// Database settings
connect(mongoUrlConnect, DataBaseOptions).then(
    () => { console.log('MongoDB connection successful'); },
    (err) => { errorHandler(err); },
);

// Starting and listening
createServer({}, app).listen(serverPort, () => {
    console.log(`Server running at localhost:${serverPort}`);
});
