// Content taken from "Getting MEAN with Mongo, Express, Angular, and Node" by Simon Holmes
/* global require, process */
var mongoose = require('mongoose');
require('dotenv').config();
var gracefulShutdown;

/*
var dbURI = config.development.database.URI;
if (process.env.NODE_ENV === 'production') {
    dbURI = config.production.database.URI;
}
*/

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true
});

// CONNECTION EVENTS
mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + process.env.DB_URI);
});
mongoose.connection.on('error', function (err) {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});

// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
gracefulShutdown = function (msg, callback) {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};
// For nodemon restarts
process.once('SIGUSR2', function () {
    gracefulShutdown('nodemon restart', function () {
        process.kill(process.pid, 'SIGUSR2');
    });
});
// For app termination
process.on('SIGINT', function () {
    gracefulShutdown('app termination', function () {
        process.exit(0);
    });
});
// For Heroku app termination
process.on('SIGTERM', function () {
    gracefulShutdown('Heroku app termination', function () {
        process.exit(0);
    });
});

// BRING IN SCHEMAS & MODELS
// require("./user");