/**
 * @overview The routing of the tasks API.
 * @author Thomas Oswald
 */

import express from 'express';
import verify from '../auth/verification';
import * as methods from '../utils/methods';
import {StatusError} from '../utils/errors';
import {Task, Solution} from '../models/sheet';

const router = express.Router();

/**
 * Gets a task by id with an aggregated solution.
 * @param {string} req.params.id: ID of a task.
 * @returns {Task} with solution.
 * @throws 400
 * @throws 404
 * @throws 500
 */
router.get('/:id/_aggregate', verify, function(req, res) {
    Task.findById(req.params.id).populate({ path: 'solution' }).exec().then((doc) => {
        res.send(doc);
    }).catch((err) => res.status(500).send(err));
});

/**
 * Updates a task.
 * @param {string} req.params.id: ID of a task.
 * @param {Task} req.body object with values for the update.
 * @returns {Task}
 * @throws 400
 * @throws 404
 * @throws 500
 */
router.put('/:id', verify, function(req, res) {
    methods.put(req.params.id, req.body, Task)
        .then((doc) => res.status(200).send(doc))
        .catch((err) => {
            if (err.name === StatusError.name) res.status(err.status).send(err.message);
            else res.status(500).send(err);
        });
});

/**
 * Delets a task.
 * @param {string} req.params.id: ID of a task.
 * @returns {Task}
 * @throws 400
 * @throws 404
 * @throws 500
 */
router.delete('/:id', verify, function(req, res) {
    methods.del(req.params.id, Task)
        .then((doc) => res.status(200).send(doc))
        .catch((err) => {
            if (err.name === StatusError.name) res.status(err.status).send(err.message);
            else res.status(500).send(err);
        });
});

/**
 * Gets all solutions of a task by its id.
 * @param {string} req.params.id: ID of a task.
 * @returns {Array} of @see {Solution}
 * @throws 400
 * @throws 404
 * @throws 500
 */
router.get('/:id/solutions', verify, function(req, res) {
    methods.deepGet(req.params.id, Task, Solution, true)
        .then((docs) => res.status(200).send(docs))
        .catch((err) => {
            if (err.name === StatusError.name) res.status(err.status).send(err.message);
            else res.status(500).send(err);
        });
});

/**
 * Creates all solutions of a task by its id.
 * @param {string} req.params.id: ID of a task.
 * @param {object} req.body with {Array} of {Solution}.
 * @returns {Array} of @see {Solution}
 * @throws 400
 * @throws 404
 * @throws 500
 */
router.post('/:id/solutions', verify, function(req, res) {
    methods.deepPost(req.params.id, req.body, Task, Solution, true)
        .then((docs) => res.status(201).send(docs))
        .catch((err) => {
            if (err.name === StatusError.name) res.status(err.status).send(err.message);
            else res.status(500).send(err);
        });
});

export default router;