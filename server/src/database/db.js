// Content taken from "Getting MEAN with Mongo, Express, Angular, and Node" by Simon Holmes
/* global require, process */
var mongoose = require('mongoose');
require('dotenv').config();
var gracefulShutdown;
let uri = '';
mongoose.Promise = Promise;
function connect(callback) {
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
    mongoose.connect(uri, {
        useNewUrlParser: true
    }, function() {
        if (callback !== undefined) callback();
    });
}

function disconnect() {
    mongoose.disconnect();
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
gracefulShutdown = function(msg, callback) {
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

// BRING IN SCHEMAS & MODELS
// require("./user");
export {connect};
export {disconnect};
