/**
 * @module API/tasks
 * @see @link https://stackoverflow.com/questions/31818538/jsdocs-documenting-node-js-express-routes
 */

/**
 * @overview The routing of the tasks API.
 * @author Thomas Oswald
 */

import express from 'express';
import verify from '../auth/verification';
import * as methods from '../utils/methods';
import {StatusError} from '../utils/errors';
import {Task, Solution} from '../models/sheet';
import { logRoute } from '../utils/log';

const router = express.Router();

/**
 * Gets a task by id with an aggregated solution.
 * @name GET|tasks/:id/_aggregate
 * @function
 * @memberof module:API/tasks
 * @param {string} req.params.id: ID of a task.
 * @returns {Task} with solution.
 * @throws 400
 * @throws 404
 * @throws 500
 */
router.get('/:id/_aggregate', verify, function(req, res, next) {
    methods.get(req.params.id, Task, {path: 'solution'})
        .then((doc) => {
            res.send(doc);
            next();
        }).catch((err) => {
            res.status(500).send(err);
            req.error = err;
            next();
        });
}, logRoute);

/**
 * Gets a task by id.
 * @name GET|tasks/:id
 * @function
 * @memberof module:API/tasks
 * @param {string} req.params.id: ID of a task.
 * @returns {Task}.
 * @throws 400
 * @throws 404
 * @throws 500
 */
router.get('/:id', verify, function(req, res, next) {
    methods.get(req.params.id, Task)
        .then((doc) => {
            res.send(doc);
            next();
        }).catch((err) => {
            res.status(500).send(err);
            req.error = err;
            next();
        });
}, logRoute);

/**
 * Updates a task.
 * @name PUT|tasks/:id
 * @function
 * @memberof module:API/tasks
 * @param {string} req.params.id: ID of a task.
 * @param {Task} req.body object with values for the update.
 * @returns {Task}
 * @throws 400
 * @throws 404
 * @throws 500
 */
router.put('/:id', verify, function(req, res, next) {
    methods.put(req.params.id, req.body, Task)
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
 * Delets a task.
 * @name DELETE|tasks/:id
 * @function
 * @memberof module:API/tasks
 * @param {string} req.params.id: ID of a task.
 * @returns {Task}
 * @throws 400
 * @throws 404
 * @throws 500
 */
router.delete('/:id', verify, function(req, res, next) {
    methods.del(req.params.id, Task)
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
 * Gets all solutions of a task by its id.
 * @name GET|tasks/:id/solutions
 * @function
 * @memberof module:API/tasks
 * @param {string} req.params.id: ID of a task.
 * @returns {Array} of @see {Solution}
 * @throws 400
 * @throws 404
 * @throws 500
 */
router.get('/:id/solutions', verify, function(req, res, next) {
    methods.deepGet(req.params.id, Task, Solution, true)
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
 * Creates all solutions of a task by its id.
 * @name POST|tasks/:id/solutions
 * @function
 * @memberof module:API/tasks
 * @param {string} req.params.id: ID of a task.
 * @param {object} req.body with {Array} of {Solution}.
 * @returns {Array} of @see {Solution}
 * @throws 400
 * @throws 404
 * @throws 500
 */
router.post('/:id/solutions', verify, function(req, res, next) {
    methods.deepPost(req.params.id, req.body, Task, Solution, true)
        .then((docs) => {
            res.status(201).send(docs);
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