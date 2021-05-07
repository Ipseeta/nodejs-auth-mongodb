const dbConfig = require('./config/db.config');
const MongoClient = require('mongodb').MongoClient;
let conn;

exports.getConnection = async () => {
    if (conn) {
        return conn;
    }

    try {
        conn = await MongoClient.connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        if (conn) console.log('Mongodb connected successfully!');
        return conn;
    }
    catch(err) {
        console.log('Error in mongodb connection', err);
        process.exit();
    }
}