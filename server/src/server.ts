import HTTP from 'http';
import express from 'express';
import mongoose from 'mongoose';
import logging from './config/logging';
import config from './config/config';
import firebaseAdmin from 'firebase-admin';

const server = express();

/**Server handling */
const httpServer = HTTP.createServer(server);

/**connect to the firebase */
let serviceAccountKey = require('./config/serviceAccountKey.json');

firebaseAdmin.initializeApp({
    credential:firebaseAdmin.credential.cert(serviceAccountKey)
})

/** connect to Mongo */
mongoose.connect(config.mongo.url, config.mongo.option)
.then(()=> {
logging.info('MongoDB is connected')
}).catch((error)=>{
    logging.error(error)
})