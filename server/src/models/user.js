/* global require */
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    forename: {
        type: String,
        required: false
    },
    lastname: {
        type: String,
        required: false
    },
    // TODO: set required to true
    // is false because of registration
    role: {
        type: Schema.Types.ObjectId,
        ref: 'Role',
        required: false
    },
    courses: {
        type: String,
        required: false
    }
});

var roleSchema = new mongoose.Schema({
    name: {
        type: String,
        enum: ['admin', 'courseadmin', 'tutor'],
        required: true
    }
});

export let User = mongoose.model('User', userSchema);
export let Role = mongoose.model('Role', roleSchema);