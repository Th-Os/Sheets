/**
 * @module database
 */

// Content taken from "Getting MEAN with Mongo, Express, Angular, and Node" by Simon Holmes
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import log from '../utils/log';
import settings from '../../resources/settings';

dotenv.config();
mongoose.Promise = Promise;

let uri = '';

/**
 * Connects to the database depending on the database settings.json variable MODE.
 * @see settings.json
 * @returns {Promise} {Promise}
 */
function connect() {
    switch (settings.database.mode) {
        case 'prod':
            uri = process.env.DB_URI_PROD;
            break;
        case 'dev_client':
            uri = process.env.DB_URI_CLIENT;
            break;
        case 'dev_server':
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
    log.info('Mongoose connected to ' + uri);
});
mongoose.connection.on('error', function(err) {
    log.error('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
    log.info('Mongoose disconnected');
});

// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
let gracefulShutdown = function(msg, callback) {
    mongoose.connection.close(function() {
        log.info('Mongoose disconnected through ' + msg);
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
