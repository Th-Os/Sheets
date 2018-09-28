/**
 * @overview The routing logic for the users API.
 * @author Thomas Oswald
 */

import express from 'express';
import verify from '../auth/verification';
import * as methods from '../utils/methods';
import bcrypt from 'bcryptjs';
import {User, Role} from '../models/user';
import { StatusError } from '../utils/errors';

const router = express.Router();

/**
 * Gets all users.
 * @returns {Array} all users.
 * @throws 400
 * @throws 404
 * @throws 500
 */
router.get('/', verify, function(req, res) {
    methods.getAll(User, { path: 'role' })
        .then((docs) => res.status(200).send(docs))
        .catch((err) => {
            if (err.name === StatusError.name) res.status(err.status).send(err.message);
            else res.status(500).send(err);
        });
});

/**
 * Gets all roles.
 * @returns {Array} all roles.
 * @throws 400
 * @throws 404
 * @throws 500
 */
router.get('/roles', verify, function(req, res) {
    Role.find({}).exec().then((docs) => {
        if (docs === undefined || docs.length === 0) res.status(404).send('No roles found');
        res.send(docs);
    }).catch((err) => res.status(500).send(err));
});

/**
 * Gets a role by id.
 * @param {string} req.params.id: ID of a role.
 * @returns {Role} role by id.
 * @throws 400
 * @throws 404
 * @throws 500
 */
router.get('/roles/:id', verify, function(req, res) {
    methods.get(req.params.id, Role)
        .then((doc) => res.status(200).send(doc))
        .catch((err) => {
            if (err.name === StatusError.name) res.status(err.status).send(err.message);
            else res.status(500).send(err);
        });
});

/**
 * Creates users.
 * @param {object|Array} req.body user objects with username, password and roleId.
 * @throws 400
 * @throws 404
 * @throws 500
 */
router.post('/', verify, function(req, res) {
    let data = req.body;
    if (!(data instanceof Array)) data = [data];
    let promises = [];
    let response = [];
    for (let item of data) {
        item.password = bcrypt.hashSync(item.password, 8);
        promises.push(User.create(item).then((user) => {
            response.push(user.username);
        }));
    }
    Promise.all(promises).then(() => {
        res.status(201).send(response);
    }).catch((err) => {
        if (err) res.status(400).send(err);
    });
});

/**
 * Gets user by id.
 * @param {string} req.params.id: ID of a user.
 * @returns {User} with a role.
 * @throws 400
 * @throws 404
 * @throws 500
 */
router.get('/:id', verify, function(req, res) {
    methods.get(req.params.id, User, { path: 'role' })
        .then((doc) => res.status(200).send(doc))
        .catch((err) => {
            if (err.name === StatusError.name) res.status(err.status).send(err.message);
            else res.status(500).send(err);
        });
});

/**
 * Updates user by id. Hashes the password beforehand.
 * @param {string} req.params.id: ID of a user.
 * @returns {User} in its updated state.
 * @throws 400
 * @throws 404
 * @throws 500
 */
router.put('/:id', verify, function(req, res) {
    if (req.body.password) {
        req.body.password = bcrypt.hashSync(req.body.password, 8);
    }
    methods.put(req.params.id, req.body, User)
        .then((doc) => res.status(200).send(doc))
        .catch((err) => {
            if (err.name === StatusError.name) res.status(err.status).send(err.message);
            else res.status(500).send(err);
        });
});

/**
 * Deletes a user by id.
 * @param {string} req.params.id: ID of a user.
 * @returns {string} success message.
 * @throws 400
 * @throws 404
 * @throws 500
 */
router.delete('/:id', verify, function(req, res) {
    methods.del(req.params.id, User)
        .then((msg) => res.status(200).send(msg))
        .catch((err) => {
            if (err.name === StatusError.name) res.status(err.status).send(err.message);
            else res.status(500).send(err);
        });
});

export default router;