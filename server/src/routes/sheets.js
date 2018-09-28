/**
 * @overview The routing of the sheets API.
 * @author Thomas Oswald
 */

import express from 'express';
import verify from '../auth/verification';
import * as methods from '../utils/methods';
import {Sheet, Exercise} from '../models/sheet';
import {StatusError} from '../utils/errors';
import {Submission} from '../models/submission';

const router = express.Router();

/**
 * Gets a sheet by id.
 * @param {string} req.params.id: ID of a sheet.
 * @returns {Sheet}
 * @throws 400
 * @throws 404
 * @throws 500
 */
router.get('/:id', verify, function(req, res) {
    methods.get(req.params.id, Sheet)
        .then((doc) => res.status(200).send(doc))
        .catch((err) => {
            if (err.name === StatusError.name) res.status(err.status).send(err.message);
            else res.status(500).send(err);
        });
});

/**
 * Gets an aggregated sheet by id.
 * @param {string} req.params.id: ID of a sheet.
 * @returns {Sheet} with Exercises, Tasks, Solution and Submissions, Answers, Task, Solution.
 * @throws 400
 * @throws 404
 * @throws 500
 */
router.get('/:id/_aggregate', verify, function(req, res) {
    methods.get(req.params.id, Sheet, [
        {
            path: 'exercises',
            model: 'Exercise',
            populate:
                {
                    path: 'tasks',
                    model: 'Task',
                    populate: { path: 'solution' }
                }
        }, {
            path: 'submissions',
            model: 'Submission',
            populate:
                [
                    {
                        path: 'answers',
                        model: 'Answer',
                        populate:
                            {
                                path: 'task',
                                populate: { path: 'solution' }
                            }
                    },
                    {
                        path: 'student'
                    }
                ]
        }
    ]).then((doc) => {
        res.send(doc);
    }).catch((err) => res.status(500).send(err));
});

/**
 * Updates a sheet by id.
 * @param {string} req.params.id: ID of a sheet.
 * @param {Sheet} req.body with updated values.
 * @returns {Sheet}
 * @throws 400
 * @throws 404
 * @throws 500
 */
router.put('/:id', verify, function(req, res) {
    methods.put(req.params.id, req.body, Sheet)
        .then((doc) => res.status(200).send(doc))
        .catch((err) => {
            if (err.name === StatusError.name) res.status(err.status).send(err.message);
            else res.status(500).send(err);
        });
});

/**
 * Deletes a sheet by id.
 * @param {string} req.params.id: ID of a sheet.
 * @returns {string} success message.
 * @throws 400
 * @throws 404
 * @throws 500
 */
router.delete('/:id', verify, function(req, res) {
    methods.del(req.params.id, Sheet)
        .then((doc) => res.status(200).send(doc))
        .catch((err) => {
            if (err.name === StatusError.name) res.status(err.status).send(err.message);
            else res.status(500).send(err);
        });
});

/**
 * Gets all exercises of a sheet by id.
 * @param {string} req.params.id: ID of a sheet.
 * @returns {Array} of @see {Exercise}
 * @throws 400
 * @throws 404
 * @throws 500
 */
router.get('/:id/exercises', verify, function(req, res) {
    methods.deepGet(req.params.id, Sheet, Exercise)
        .then((docs) => res.status(200).send(docs))
        .catch((err) => {
            if (err.name === StatusError.name) res.status(err.status).send(err.message);
            else res.status(500).send(err);
        });
});

/**
 * Gets all submissions of a sheet by id.
 * @param {string} req.params.id: ID of a sheet.
 * @returns {Array} of @see {Submission}
 * @throws 400
 * @throws 404
 * @throws 500
 */
router.get('/:id/submissions', verify, function(req, res) {
    methods.deepGet(req.params.id, Sheet, Submission)
        .then((docs) => res.status(200).send(docs))
        .catch((err) => {
            if (err.name === StatusError.name) res.status(err.status).send(err.message);
            else res.status(500).send(err);
        });
});

/**
 * Creates exercises for a sheet by id.
 * @param {string} req.params.id: ID of a sheet.
 * @param {Array} req.body Array of exercises.
 * @returns {Array} of @see {Exercise}
 * @throws 400
 * @throws 404
 * @throws 500
 */
router.post('/:id/exercises', verify, function(req, res) {
    methods.deepPost(req.params.id, req.body, Sheet, Exercise)
        .then((docs) => res.status(201).send(docs))
        .catch((err) => {
            if (err.name === StatusError.name) res.status(err.status).send(err.message);
            else res.status(500).send(err);
        });
});

/**
 * Creates submissions for a sheet by id.
 * @param {string} req.params.id: ID of a sheet.
 * @param {Array} req.body Array of submissions.
 * @returns {Array} of @see {Submission}
 * @throws 400
 * @throws 404
 * @throws 500
 */
router.post('/:id/submissions', verify, function(req, res) {
    methods.deepPost(req.params.id, req.body, Sheet, Submission)
        .then((docs) => res.status(201).send(docs))
        .catch((err) => {
            if (err.name === StatusError.name) res.status(err.status).send(err.message);
            else res.status(500).send(err);
        });
});

/**
 * Creates submissions with 2 further levels (answers and task) for a sheet by id.
 * @param {string} req.params.id: ID of a sheet.
 * @param {Array} req.body Array of submissions.
 * @returns {Array} of @see {Submission}
 * @throws 400
 * @throws 404
 * @throws 500
 */
router.post('/:id/submissions/_bulk', verify, function(req, res) {
    methods.bulkPost(req.params.id, req.body, Sheet, Submission)
        .then((docs) => res.status(201).send(docs))
        .catch((err) => {
            if (err.name === StatusError.name) res.status(err.status).send(err.message);
            else res.status(500).send(err);
        });
});

/**
 * Deletes all exercises of a sheet by id.
 * @param {string} req.params.id: ID of a sheet.
 * @returns {string} success message.
 * @throws 400
 * @throws 404
 * @throws 500
 */
router.delete('/:id/exercises', verify, function(req, res) {
    methods.deepDel(req.params.id, Sheet, Exercise, false).then((msg) => {
        res.send(msg);
    }).catch((err) => {
        if (err.name === StatusError.name) res.status(err.status).send(err.message);
        else res.status(500).send(err);
    });
});

/**
 * Deletes all submissions of a sheet by id.
 * @param {string} req.params.id: ID of a sheet.
 * @returns {string} success message.
 * @throws 400
 * @throws 404
 * @throws 500
 */
router.delete('/:id/submissions', verify, function(req, res) {
    methods.deepDel(req.params.id, Sheet, Submission, false).then((msg) => {
        res.send(msg);
    }).catch((err) => {
        if (err.name === StatusError.name) res.status(err.status).send(err.message);
        else res.status(500).send(err);
    });
});

/**
 * Redirects to @see export.js
 */
router.get('/:id/pdf', verify, function(req, res) {
    res.redirect('../../export/pdf/' + req.params.id);
});

/**
 * Redirects to @see export.js
 */
router.get('/:id/docx', verify, function(req, res) {
    res.redirect('../../export/docx/' + req.params.id);
});

/**
 * Redirects to @see export.js
 */
router.get('/:id/csv', verify, function(req, res) {
    res.redirect('../../export/csv/' + req.params.id);
});

/**
 * Redirects to @see export.js
 */
router.get('/:id/template', verify, function(req, res) {
    res.redirect('../../export/template/' + req.params.id);
});

export default router;