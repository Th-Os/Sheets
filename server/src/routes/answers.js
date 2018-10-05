/**
 * @module API/answers
 * @see @link https://stackoverflow.com/questions/31818538/jsdocs-documenting-node-js-express-routes
 */

/**
 * @overview The routing of the answers API.
 * @author Thomas Oswald
 */

import express from 'express';
import verify from '../auth/verification';
import * as methods from '../utils/methods';
import {StatusError} from '../utils/errors';
import {Answer} from '../models/submission';
import {logRoute} from '../utils/log';

const router = express.Router();

/**
 * Gets an answer by id.
 * @name GET|answers/:id
 * @function
 * @memberof module:API/answers
 * @param {string} req.params.id - ID of a answer.
 * @returns {Answer}
 * @throws 400
 * @throws 404
 * @throws 500
 */
router.get('/:id', verify, function(req, res, next) {
    methods.get(req.params.id, Answer)
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
 * Updates an answer.
 * @name PUT|answers/:id
 * @function
 * @memberof module:API/answers
 * @param {Array|Answer} req.body - One or more answers.
 * @returns {Answer}
 * @throws 400
 * @throws 404
 * @throws 500
 */
router.put('/:id', verify, function(req, res, next) {
    methods.put(req.params.id, req.body, Answer)
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

export default router;