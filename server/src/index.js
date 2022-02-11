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

async function start() {
    // Here, code praying to the GOD for protecting our open project from bugs and other things.
    // This is really crucial step! Be adviced to not remove it, even if you don't believer.
    console.log("\n Rahman ve Rahim olan Allah'ın adıyla.\n");

    // Database settings
    await connect(mongoUrlConnect, DataBaseOptions).then(
        () => { console.log('MongoDB connection successful'); },
        (err) => { errorHandler(err); },
    );

    // Starting and listening
    createServer(app).listen(serverPort, () => {
        console.log(`Server running at http://localhost:${serverPort}/`);
    });
}

start();
