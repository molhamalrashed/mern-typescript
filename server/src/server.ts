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
let serviceAccountKey = require('./config/serverAccountKey.json');

firebaseAdmin.initializeApp({
    credential:firebaseAdmin.credential.cert(serviceAccountKey)
})
 
/** connect to Mongo */
mongoose.connect(config.mongo.url , config.mongo.option)
.then(()=> {
logging.info('MongoDB is connected')
}).catch((error)=>{
    logging.error(error)
})

/**logging middleware */
server.use((req,res, next)=>{
    logging.info(`Method: ${req.method} - URl: ${req.url} - IP: ${req.socket.remoteAddress}`)
    res.on('finish', ()=>{
        logging.info(`Method: ${req.method} - URL: ${req.url}- IP: ${req.socket.remoteAddress} Status: ${res.statusCode}`);
    })
    next()
})

/**Parse the body */
server.use(express.urlencoded({extended:true}));
server.use(express.json());

/**API access policies */

server.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

if(req.method === 'OPTIONS'){
    res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST PUT');
    return res.status(200).json({});
}
    next();
})

/**Routes */

/**Error handling */

server.use((req, res, next)=>{
    const error = new Error('Not found');
    return res.status(404).json({
        message: error.message
    })
})

/** listen for requests */
httpServer.listen(config.server.port, ()=>{
    logging.info(`Sever is running on ${config.server.host}:${config.server.port}`);
});