// Content taken from "Getting MEAN with Mongo, Express, Angular, and Node" by Simon Holmes
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
mongoose.Promise = Promise;

let uri = '';

/**
 * Connects to the database depending on the environmant variable MODE.
 * @returns {Promise} {Promise}
 */
function connect() {
    switch (process.env.MODE) {
        case 'production':
            uri = process.env.DB_URI_PROD;
            break;
        case 'client':
            uri = process.env.DB_URI_CLIENT;
            break;
        case 'server':
            uri = process.env.DB_URI_SERVER;
            break;
        default:
            uri = process.env.DB_URI_SERVER;
            break;
    }
    return mongoose.connect(uri, {
        useNewUrlParser: true,
        keepAlive: true,
        keepAliveInitialDelay: 300000
    });
}

/**
 * Disconnects from the database.
 * @returns {Promise} {Promise}
 */
function disconnect() {
    return mongoose.disconnect();
}

// CONNECTION EVENTS
mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to ' + uri);
});
mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected');
});

// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
let gracefulShutdown = function(msg, callback) {
    mongoose.connection.close(function() {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};
// For nodemon restarts
process.once('SIGUSR2', function() {
    gracefulShutdown('nodemon restart', function() {
        process.kill(process.pid, 'SIGUSR2');
    });
});
// For app termination
process.on('SIGINT', function() {
    gracefulShutdown('app termination', function() {
        process.exit(0);
    });
});
// For Heroku app termination
process.on('SIGTERM', function() {
    gracefulShutdown('Heroku app termination', function() {
        process.exit(0);
    });
});

export {connect, disconnect};