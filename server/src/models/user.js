/* global require */
var mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

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

// TODO: set required to true
var roleSchema = new mongoose.Schema({
    name: {
        type: String,
        enum: ['admin', 'courseadmin', 'tutor'],
        required: false
    }
});

/*

Could be useful methods:

userSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

userSchema.methods.verifyPassword = function (password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

userSchema.methods.generateJWT = function () {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    return jwt.sign({
        email: this.email,
        id: this._id,
        exp: parseInt(expirationDate.getTime() / 1000, 10)
    }, 'secret');
};

userSchema.methods.toAuthJSON = function () {
    return {
        _id: this._id,
        email: this.email,
        token: this.generateJWT()
    };
};

*/

let User = mongoose.model('User', userSchema);
let Role = mongoose.model('Role', roleSchema);
module.exports = User;