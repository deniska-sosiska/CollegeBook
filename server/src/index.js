/* eslint-disable no-console */

import cors from 'cors';
import { join } from 'path';
import express, { json } from 'express';
import { connect } from 'mongoose';
import { createServer } from 'http';
import { router } from './routes';
import { mongoUrlConnect, serverPort, DataBaseOptions, errorHandler } from './config';

// Application initialization
const app = express();

app.use(cors());
app.use(json());
app.use(express.static(join(__dirname, '../public')));
app.use(router);

var hui = 5;

async function start() {
    // Database settings
    await connect(mongoUrlConnect, DataBaseOptions).then(
        () => { console.log('\nMongoDB connection successful'); },
        (err) => { errorHandler(err); },
    );

    // Starting and listening
    createServer(app).listen(serverPort, () => {
        console.log(`Server running at http://localhost:${serverPort}/`);
    });
}

start();
