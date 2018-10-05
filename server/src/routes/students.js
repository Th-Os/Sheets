/**
 * @module API/students
 * @see @link https://stackoverflow.com/questions/31818538/jsdocs-documenting-node-js-express-routes
 */

/**
 * @overview The routing of the students API.
 * @author Thomas Oswald
 */

import express from 'express';
import verify from '../auth/verification';
import * as methods from '../utils/methods';
import {StatusError} from '../utils/errors';
import {Student, Submission} from '../models/submission';
import {Sheet} from '../models/sheet';
import {Course} from '../models/course';
import {logRoute} from '../utils/log';

const router = express.Router();

/**
 * Searches through all students with a mat_nr.
 * @name GET|students/_search
 * @function
 * @memberof module:API/students
 * @param {string} req.query.matnr: matricle number of a student.
 * @returns {Student}
 * @throws 400
 * @throws 404
 * @throws 500
 * @example /students/_search?matnr={mat_nr}
 */
router.get('/_search', verify, function(req, res, next) {
    let id = req.query.matnr;
    let err;
    if (id !== undefined) {
        Student.find({'mat_nr': id}).exec().then((students) => {
            if (students === null || students.length === 0) {
                err = new Error('Found no student with mat_nr: ' + id);
                res.status(404).send(err);
                req.error = err;
                next();
            } else if (students.length >= 1) {
                err = new Error('Found more than one student with mat_nr: ' + id);
                res.status(500).send(err);
                req.error = err;
                next();
            } else {
                res.send(students[0]);
                next();
            }
        });
    } else {
        err = new Error('The query: ' + Object.keys(req.query)[0] + ' does not exist.');
        res.status(400).send(err);
        req.error = err;
        next();
    }
}, logRoute);

/**
 * Gets a student by id.
 * @name GET|students/:id
 * @function
 * @memberof module:API/students
 * @param {string} req.params.id: ID of a student.
 * @returns {Student}
 * @throws 400
 * @throws 404
 * @throws 500
 */
router.get('/:id', verify, function(req, res, next) {
    methods.get(req.params.id, Student)
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
 * Creates students.
 * @name POST|students
 * @function
 * @memberof module:API/students
 * @param {Array} req.body with {Student}
 * @returns {Array} of @see {Student}
 * @throws 400
 * @throws 404
 * @throws 500
 */
router.post('/', verify, function(req, res, next) {
    methods.post(req.body, Student)
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

/**
 * Updates a student by id.
 * @name PUT|students/:id
 * @function
 * @memberof module:API/students
 * @param {string} req.params.id: ID of a student.
 * @param {Student} req.body with updated values.
 * @returns {Student}
 * @throws 400
 * @throws 404
 * @throws 500
 */
router.put('/:id', verify, function(req, res, next) {
    methods.put(req.params.id, req.body, Student)
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
 * Deletes a student by id.
 * @name DELETE|students/:id
 * @function
 * @memberof module:API/students
 * @param {string} req.params.id: ID of a student.
 * @returns {string} success message.
 * @throws 400
 * @throws 404
 * @throws 500
 */
router.delete('/:id', verify, function(req, res, next) {
    methods.del(req.params.id, res, Student)
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

/**
 * Gets all submissions of a student by id.
 * @name GET|students/:id/submissions
 * @function
 * @memberof module:API/students
 * @param {string} req.params.id: ID of a student.
 * @returns {Array} of @see {Submission}
 * @throws 400
 * @throws 404
 * @throws 500
 */
router.get('/:id/submissions', verify, function(req, res, next) {
    Submission.find({'student': req.params.id}).exec()
        .then((subs) => {
            res.send(subs);
            next();
        })
        .catch((err) => {
            res.status(400).send(err);
            req.error = err;
            next();
        });
}, logRoute);

/**
 * Gets all courses of a student by id.
 * @name GET|students/:id/courses
 * @function
 * @memberof module:API/students
 * @param {string} req.params.id: ID of a student.
 * @returns {Array} of @see {Courses}
 * @throws 400
 * @throws 404
 * @throws 500
 */
router.get('/:id/courses', verify, function(req, res, next) {
    Submission.find({'student': req.params.id}).exec().then((subs) => {
        let ids = subs.map((s) => s._id);
        Sheet.find()
            .where('submissions')
            .in(ids)
            .exec().then((sheets) => {
                ids = sheets.map((s) => s._id);
                Course.find().where('sheets').in(ids).exec()
                    .then((docs) => {
                        res.send(docs);
                        next();
                    }).catch((err) => {
                        res.status(400).send(err);
                        req.error = err;
                        next();
                    });
            }).catch((err) => {
                res.status(400).send(err);
                req.error = err;
                next();
            });
    }).catch((err) => {
        res.status(400).send(err);
        req.error = err;
        next();
    });
}, logRoute);

export default router;