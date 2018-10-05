/**
 * @module API/solutions
 * @see @link https://stackoverflow.com/questions/31818538/jsdocs-documenting-node-js-express-routes
 */

/**
 * @overview The routing of the solutions API.
 * @author Thomas Oswald
 */

import express from 'express';
import verify from '../auth/verification';
import * as methods from '../utils/methods';
import {StatusError} from '../utils/errors';
import {Solution} from '../models/sheet';
import {logRoute} from '../utils/log';

const router = express.Router();

/**
 * Updates a solution by id.
 * @name PUT|solutions/:id
 * @function
 * @memberof module:API/solutions
 * @param {string} req.params.id: ID of a solution.
 * @param {Solution} req.body with updated values.
 * @returns {Solution}
 * @throws 400
 * @throws 404
 * @throws 500
 */
router.put('/:id', verify, function(req, res, next) {
    methods.put(req.params.id, req.body, Solution)
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
 * Deletes a solution by id.
 * @name DELETE|solutions/:id
 * @function
 * @memberof module:API/solutions
 * @param {string} req.params.id: ID of a solution.
 * @returns {string} success message.
 * @throws 400
 * @throws 404
 * @throws 500
 */
router.delete('/:id', verify, function(req, res, next) {
    methods.del(req.params.id, Solution)
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