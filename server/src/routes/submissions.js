/**
 * @overview The routing of the submissions API.
 * @author Thomas Oswald
 */

import express from 'express';
import verify from '../auth/verification';
import * as methods from '../utils/methods';
import {StatusError} from '../utils/errors';
import {Submission, Answer} from '../models/submission';

const router = express.Router();

/**
 * Searches through all submissions with an user id.
 * @param {string} req.query.user: ID of a user.
 * @returns {Array} of @see {Submission}
 * @throws 400
 * @throws 404
 * @throws 500
 * @example /submissions/_search?user={ID}
 */
router.get('/_search', verify, function(req, res) {
    let userId = req.query.user;
    if (userId !== undefined) {
        Submission.find({ user: userId }).then((subs) => {
            if (subs === undefined || subs.length === 0) {
                res.status(404).send('No submissions found');
            } else res.send(subs);
        }).catch((err) => res.status(500).send(err));
    } else {
        res.send(400).send('Query "' + req.query + '" not available.');
    }
});

/**
 * Updates a submission by id.
 * @param {string} req.params.id: ID of a submission.
 * @param {object} req.body with values for update.
 * @returns {Submission}
 * @throws 400
 * @throws 404
 * @throws 500
 */
router.put('/:id', verify, function(req, res) {
    methods.put(req.params.id, req.body, Submission)
        .then((doc) => {
            res.send(doc);
        })
        .catch((err) => res.status(500).send(err));
});

/**
 * Gets all answers of a submission by id.
 * @param {string} req.params.id: ID of a submission.
 * @returns {Array} of @see {Answer}
 * @throws 400
 * @throws 404
 * @throws 500
 */
router.get('/:id/answers', verify, function(req, res) {
    methods.get(req.params.id, Submission, { path: 'answers' })
        .then((doc) => res.status(200).send(doc.answers))
        .catch((err) => {
            if (err.name === StatusError.name) res.status(err.status).send(err.message);
            else res.status(500).send(err);
        });
});

/**
 * Creates answers for a submission by id.
 * @param {string} req.params.id: ID of a submission.
 * @param {Array} req.body with {Answer}
 * @returns {Array} of @see {Answer}
 * @throws 400
 * @throws 404
 * @throws 500
 */
router.post('/:id/answers', verify, function(req, res) {
    methods.deepPost(req.params.id, req.body, Submission, Answer)
        .then((docs) => res.status(200).send(docs))
        .catch((err) => {
            if (err.name === StatusError.name) res.status(err.status).send(err.message);
            else res.status(500).send(err);
        });
});

/**
 * Searches through all answers of an submission by id with a task id.
 * @param {string} req.query.task: ID of a task.
 * @returns {Array} of @see {Answer}
 * @throws 400
 * @throws 404
 * @throws 500
 * @example /submissions/:id/answers/_search?task={ID}
 */
router.get('/:id/answers/_search', verify, function(req, res) {
    let taskId = req.query.task;
    if (taskId !== undefined) {
        methods.get(req.params.id, Submission).then((doc) => {
            let promises = [];
            let answers = [];
            for (let answerId of doc.answers) {
                promises.push(Answer.findById(answerId).exec().then((answer) => {
                    if (answer.task.equals(taskId)) {
                        answers.push(answer);
                    }
                }).catch((err) => {
                    res.status(500).send(err);
                }));
            }
            Promise.all(promises).then(() => {
                res.status(200).send(answers);
            }).catch((err) => {
                res.status(500).send(err);
            });
        }).catch((err) => {
            if (err.name === StatusError.name) res.status(err.status).send(err.message);
            else res.status(500).send(err);
        });
    } else {
        res.send(400).send('Query "' + req.query + '" not available.');
    }
});

export default router;