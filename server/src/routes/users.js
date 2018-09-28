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
import { logRoute } from '../utils/log';

const router = express.Router();

/**
 * Gets all users.
 * @returns {Array} all users.
 * @throws 400
 * @throws 404
 * @throws 500
 */
router.get('/', verify, function(req, res, next) {
    methods.getAll(User, { path: 'role' })
        .then((docs) => {
            res.status(200).send(docs);
            next();
        })
        .catch((err) => {
            if (err.name === StatusError.name) res.status(err.status).send(err.message);
            else res.status(500).send(err);
            req.error = err;
            next();
        });
}, logRoute);

/**
 * Gets all roles.
 * @returns {Array} all roles.
 * @throws 400
 * @throws 404
 * @throws 500
 */
router.get('/roles', verify, function(req, res, next) {
    Role.find({}).exec().then((docs) => {
        if (docs === undefined || docs.length === 0) res.status(404).send('No roles found');
        res.send(docs);
        next();
    }).catch((err) => {
        res.status(500).send(err);
        req.error = err;
        next();
    });
}, logRoute);

/**
 * Gets a role by id.
 * @param {string} req.params.id: ID of a role.
 * @returns {Role} role by id.
 * @throws 400
 * @throws 404
 * @throws 500
 */
router.get('/roles/:id', verify, function(req, res, next) {
    methods.get(req.params.id, Role)
        .then((doc) => {
            res.status(200).send(doc);
            next();
        })
        .catch((err) => {
            if (err.name === StatusError.name) res.status(err.status).send(err.message);
            else res.status(500).send(err);
            req.error = err;
            next();
        });
}, logRoute);

/**
 * Creates users.
 * @param {object|Array} req.body user objects with username, password and roleId.
 * @throws 400
 * @throws 404
 * @throws 500
 */
router.post('/', verify, function(req, res, next) {
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
        next();
    }).catch((err) => {
        if (err) res.status(400).send(err);
        req.error = err;
        next();
    });
}, logRoute);

/**
 * Gets user by id.
 * @param {string} req.params.id: ID of a user.
 * @returns {User} with a role.
 * @throws 400
 * @throws 404
 * @throws 500
 */
router.get('/:id', verify, function(req, res, next) {
    methods.get(req.params.id, User, { path: 'role' })
        .then((doc) => {
            res.status(200).send(doc);
            next();
        })
        .catch((err) => {
            if (err.name === StatusError.name) res.status(err.status).send(err.message);
            else res.status(500).send(err);
            req.error = err;
            next();
        });
}, logRoute);

/**
 * Updates user by id. Hashes the password beforehand.
 * @param {string} req.params.id: ID of a user.
 * @returns {User} in its updated state.
 * @throws 400
 * @throws 404
 * @throws 500
 */
router.put('/:id', verify, function(req, res, next) {
    if (req.body.password) {
        req.body.password = bcrypt.hashSync(req.body.password, 8);
    }
    methods.put(req.params.id, req.body, User)
        .then((doc) => {
            res.status(200).send(doc);
            next();
        })
        .catch((err) => {
            if (err.name === StatusError.name) res.status(err.status).send(err.message);
            else res.status(500).send(err);
            req.error = err;
            next();
        });
}, logRoute);

/**
 * Deletes a user by id.
 * @param {string} req.params.id: ID of a user.
 * @returns {string} success message.
 * @throws 400
 * @throws 404
 * @throws 500
 */
router.delete('/:id', verify, function(req, res, next) {
    methods.del(req.params.id, User)
        .then((msg) => {
            res.status(200).send(msg);
            next();
        })
        .catch((err) => {
            if (err.name === StatusError.name) res.status(err.status).send(err.message);
            else res.status(500).send(err);
            req.error = err;
            next();
        });
}, logRoute);

export default router;