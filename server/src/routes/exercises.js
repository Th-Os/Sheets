// TODO: document with  ./node_modules/.bin/jsdoc -c jsdoc-conf.json
/**
 * @module API/exercises
 * @see @link https://stackoverflow.com/questions/31818538/jsdocs-documenting-node-js-express-routes
 */

/**
 * @overview The routing of the exercises API.
 * @author Thomas Oswald
 */

import express from 'express';
import verify from '../auth/verification';
import * as methods from '../utils/methods';
import {StatusError} from '../utils/errors';
import {Exercise, Task} from '../models/sheet';
import {logRoute} from '../utils/log';

const router = express.Router();

/**
 * Gets an aggregated exercise by id.
 * @name GET|exercises/:id/_aggregate
 * @function
 * @memberof module:API/exercises
 * @param {string} req.params.id: ID of an exercise.
 * @returns {Exercise} with Tasks and a Solution.
 * @throws 400
 * @throws 404
 * @throws 500
 */
router.get('/:id/_aggregate', verify, function(req, res, next) {
    Exercise.findById(req.params.id).populate({
        path: 'exercises',
        model: 'Exercise',
        populate:
            {
                path: 'tasks',
                model: 'Task',
                populate: { path: 'solution' }
            }
    }).exec().then((doc) => {
        res.send(doc);
        next();
    }).catch((err) => {
        res.status(500).send(err);
        req.error = err;
        next();
    });
}, logRoute);

/**
 * Gets an exercise by id.
 * @name GET|exercises/:id
 * @function
 * @memberof module:API/exercises
 * @param {string} req.params.id: ID of an exercise.
 * @returns {Exercise}
 * @throws 400
 * @throws 404
 * @throws 500
 */
router.get('/:id', verify, function(req, res, next) {
    methods.get(req.params.id, Exercise)
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
 * Updates an exercise by id.
 * @name PUT|exercises/:id
 * @function
 * @memberof module:API/exercises
 * @param {string} req.params.id: ID of an exercise.
 * @param {Exercise} req.body with updated values.
 * @returns {Exercise}
 * @throws 400
 * @throws 404
 * @throws 500
 */
router.put('/:id', verify, function(req, res, next) {
    methods.put(req.params.id, req.body, Exercise)
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
 * Deletes an exercise by id.
 * @name DELETE|exercises/:id
 * @function
 * @memberof module:API/exercises
 * @param {string} req.params.id: ID of an exercise.
 * @returns {string} success message.
 * @throws 400
 * @throws 404
 * @throws 500
 */
router.delete('/:id', verify, function(req, res, next) {
    methods.del(req.params.id, Exercise)
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
 * Gets all tasks of an exercise by id.
 * @name GET|exercises/:id/tasks
 * @function
 * @memberof module:API/exercises
 * @param {string} req.params.id: ID of an exercise.
 * @returns {Array} of {Task}
 * @throws 400
 * @throws 404
 * @throws 500
 */
router.get('/:id/tasks', verify, function(req, res, next) {
    methods.deepGet(req.params.id, Exercise, Task)
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
 * Creates tasks for an exercise by id.
 * @name POST|exercises/:id/tasks
 * @function
 * @memberof module:API/exercises
 * @param {string} req.params.id: ID of an exercise.
 * @param {Array} req.body Array of tasks.
 * @returns {Array} of {Task}
 * @throws 400
 * @throws 404
 * @throws 500
 */
router.post('/:id/tasks', verify, function(req, res, next) {
    methods.deepPost(req.params.id, req.body, Exercise, Task)
        .then((doc) => {
            res.status(201).send(doc);
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