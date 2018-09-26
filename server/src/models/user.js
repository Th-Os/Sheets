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
    email: {
        type: String,
        required: false
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: 'Role',
        required: true
    },
    courses: [{
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: false
    }]
});

var roleSchema = new mongoose.Schema({
    name: {
        type: String,
        enum: ['admin', 'lecturer', 'tutor'],
        required: true
    }
});

export let User = mongoose.model('User', userSchema);
export let Role = mongoose.model('Role', roleSchema);