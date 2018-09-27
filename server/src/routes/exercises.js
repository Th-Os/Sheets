/**
 * @overview The routing of the exercises API.
 * @author Thomas Oswald
 */

import express from 'express';
import verify from '../auth/verification';
import * as methods from '../utils/methods';
import {StatusError} from '../utils/errors';
import {Exercise, Task} from '../models/sheet';

const router = express.Router();

/**
 * Gets an aggregated exercise by id.
 * @param {string} req.params.id: ID of an exercise.
 * @returns {Exercise} with Tasks and a Solution.
 * @throws 400
 * @throws 404
 * @throws 500
 */
router.get('/:id/_aggregate', verify, function(req, res) {
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
    }).catch((err) => res.status(500).send(err));
});

/**
 * Updates an exercise by id.
 * @param {string} req.params.id: ID of an exercise.
 * @param {Exercise} req.body with updated values.
 * @returns {Exercise}
 * @throws 400
 * @throws 404
 * @throws 500
 */
router.put('/:id', verify, function(req, res) {
    methods.put(req.params.id, req.body, Exercise)
        .then((doc) => res.status(200).send(doc))
        .catch((err) => {
            if (err.name === StatusError.name) res.status(err.status).send(err.message);
            else res.status(500).send(err);
        });
});

/**
 * Deletes an exercise by id.
 * @param {string} req.params.id: ID of an exercise.
 * @returns {string} success message.
 * @throws 400
 * @throws 404
 * @throws 500
 */
router.delete('/:id', verify, function(req, res) {
    methods.del(req.params.id, Exercise)
        .then((doc) => res.status(200).send(doc))
        .catch((err) => {
            if (err.name === StatusError.name) res.status(err.status).send(err.message);
            else res.status(500).send(err);
        });
});

/**
 * Gets all tasks of an exercise by id.
 * @param {string} req.params.id: ID of an exercise.
 * @returns {Array} of {Task}
 * @throws 400
 * @throws 404
 * @throws 500
 */
router.get('/:id/tasks', verify, function(req, res) {
    methods.deepGet(req.params.id, Exercise, Task)
        .then((doc) => res.status(200).send(doc))
        .catch((err) => {
            if (err.name === StatusError.name) res.status(err.status).send(err.message);
            else res.status(500).send(err);
        });
});

/**
 * Creates tasks for an exercise by id.
 * @param {string} req.params.id: ID of an exercise.
 * @param {Array} req.body Array of tasks.
 * @returns {Array} of {Task}
 * @throws 400
 * @throws 404
 * @throws 500
 */
router.post('/:id/tasks', verify, function(req, res) {
    methods.deepPost(req.params.id, req.body, Exercise, Task)
        .then((doc) => res.status(200).send(doc))
        .catch((err) => {
            if (err.name === StatusError.name) res.status(err.status).send(err.message);
            else res.status(500).send(err);
        });
});

export default router;