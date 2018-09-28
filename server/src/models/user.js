/**
 * @overview The definition of the schemas and models of user and role.
 * @author Thomas Oswald and Johannes Dengler
 */

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: false
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

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        enum: ['admin', 'lecturer', 'tutor'],
        required: true
    }
});

export let User = mongoose.model('User', userSchema);
export let Role = mongoose.model('Role', roleSchema);