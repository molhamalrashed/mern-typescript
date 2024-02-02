const config = {
    mongo: {
        option:{
            useUnifiedTopology: true,
            useNewUrlParser: true,
            socketTimeoutMS: 30000,
            keepAlive: true,
            poolSize: 50,
            autoIndex: false,
            retryWrites: false
        },
        url: 'mongodb+srv://molham-typescript:1235812@cluster0.2p7x7r7.mongodb.net/molham-typescript',
    },
    server:{
        host: 'localhost',
        port: 3000
    }
}


export default config;