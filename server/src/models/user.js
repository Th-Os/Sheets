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
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: 'Role',
        required: true
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

mongoose.model('User', userSchema);
mongoose.model('Role', roleSchema);