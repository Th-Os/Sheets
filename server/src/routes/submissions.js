/**
 * @module API/submissions
 * @see @link https://stackoverflow.com/questions/31818538/jsdocs-documenting-node-js-express-routes
 */

/**
 * @overview The routing of the submissions API.
 * @author Thomas Oswald
 */

import express from 'express';
import verify from '../auth/verification';
import * as methods from '../utils/methods';
import {StatusError} from '../utils/errors';
import {Submission, Answer} from '../models/submission';
import {logRoute} from '../utils/log';

const router = express.Router();

/**
 * Searches through all submissions with an user id.
 * @name GET|submissions/_search
 * @function
 * @memberof module:API/submissions
 * @param {string} req.query.user: ID of a user.
 * @returns {Array} of @see {Submission}
 * @throws 400
 * @throws 404
 * @throws 500
 * @example /submissions/_search?user={ID}
 */
router.get('/_search', verify, function(req, res, next) {
    let userId = req.query.user;
    if (userId !== undefined) {
        Submission.find({ user: userId }).then((subs) => {
            if (subs === undefined || subs.length === 0) {
                res.status(404).send('No submissions found');
            } else res.send(subs);
            next();
        }).catch((err) => {
            res.status(500).send(err);
            req.error = err;
            next();
        });
    } else {
        let err = new Error('Query "' + req.query + '" not available.');
        res.send(400).send(err);
        req.error = err;
        next();
    }
}, logRoute);

/**
 * Updates a submission by id.
 * @name PUT|submissions/:id
 * @function
 * @memberof module:API/submissions
 * @param {string} req.params.id: ID of a submission.
 * @param {object} req.body with values for update.
 * @returns {Submission}
 * @throws 400
 * @throws 404
 * @throws 500
 */
router.put('/:id', verify, function(req, res, next) {
    methods.put(req.params.id, req.body, Submission)
        .then((doc) => {
            res.send(doc);
            next();
        })
        .catch((err) => {
            res.status(500).send(err);
            req.error = err;
            next();
        });
}, logRoute);

/**
 * Gets all answers of a submission by id.
 * @name GET|submissions/:id/answers
 * @function
 * @memberof module:API/submissions
 * @param {string} req.params.id: ID of a submission.
 * @returns {Array} of @see {Answer}
 * @throws 400
 * @throws 404
 * @throws 500
 */
router.get('/:id/answers', verify, function(req, res, next) {
    methods.get(req.params.id, Submission, { path: 'answers' })
        .then((doc) => {
            res.status(200).send(doc.answers);
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
 * Creates answers for a submission by id.
 * @name POST|submissions/:id/answers
 * @function
 * @memberof module:API/submissions
 * @param {string} req.params.id: ID of a submission.
 * @param {Array} req.body with {Answer}
 * @returns {Array} of @see {Answer}
 * @throws 400
 * @throws 404
 * @throws 500
 */
router.post('/:id/answers', verify, function(req, res, next) {
    methods.deepPost(req.params.id, req.body, Submission, Answer)
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

/**
 * Searches through all answers of an submission by id with a task id.
 * @name GET|submissions/:id/answers/_search
 * @function
 * @memberof module:API/submissions
 * @param {string} req.query.task: ID of a task.
 * @returns {Array} of @see {Answer}
 * @throws 400
 * @throws 404
 * @throws 500
 * @example /submissions/:id/answers/_search?task={ID}
 */
router.get('/:id/answers/_search', verify, function(req, res, next) {
    let taskId = req.query.task;
    if (taskId !== undefined) {
        methods.get(req.params.id, Submission).then((doc) => {
            let promises = [];
            let answers = [];
            for (let answerId of doc.answers) {
                promises.push(Answer.findById(answerId).exec().then((answer) => {
                    if (answer.task && answer.task.equals(taskId)) {
                        answers.push(answer);
                        res.send(answer);
                        next();
                    }
                }).catch((err) => {
                    res.status(500).send(err);
                    req.error = err;
                    next();
                }));
            }
            Promise.all(promises).then(() => {
                res.status(200).send(answers);
                next();
            }).catch((err) => {
                res.status(500).send(err);
                req.error = err;
                next();
            });
        }).catch((err) => {
            if (err.name === StatusError.name) res.status(err.status).send(err.message);
            else res.status(500).send(err);
            req.error = err;
            next();
        });
    } else {
        let err = new Error('Query "' + req.query + '" not available.');
        res.send(400).send(err);
        req.error = err;
        next();
    }
}, logRoute);

export default router;
