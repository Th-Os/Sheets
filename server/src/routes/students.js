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

const router = express.Router();

/**
 * Gets a student by id.
 * @param {string} req.params.id: ID of a student.
 * @returns {Student}
 * @throws 400
 * @throws 404
 * @throws 500
 */
router.get('/:id', verify, function(req, res) {
    methods.get(req.params.id, Student)
        .then((doc) => res.status(200).send(doc))
        .catch((err) => {
            if (err.name === StatusError.name) res.status(err.status).send(err.message);
            else res.status(500).send(err);
        });
});

/**
 * Creates students.
 * @param {Array} req.body with {Student}
 * @returns {Array} of @see {Student}
 * @throws 400
 * @throws 404
 * @throws 500
 */
router.post('/', verify, function(req, res) {
    methods.post(req.body, Student)
        .then((doc) => res.status(200).send(doc))
        .catch((err) => {
            if (err.name === StatusError.name) res.status(err.status).send(err.message);
            else res.status(500).send(err);
        });
});

/**
 * Updates a student by id.
 * @param {string} req.params.id: ID of a student.
 * @param {Student} req.body with updated values.
 * @returns {Student}
 * @throws 400
 * @throws 404
 * @throws 500
 */
router.put('/:id', verify, function(req, res) {
    methods.put(req.params.id, req.body, Student)
        .then((doc) => res.status(200).send(doc))
        .catch((err) => {
            if (err.name === StatusError.name) res.status(err.status).send(err.message);
            else res.status(500).send(err);
        });
});

/**
 * Deletes a student by id.
 * @param {string} req.params.id: ID of a student.
 * @returns {string} success message.
 * @throws 400
 * @throws 404
 * @throws 500
 */
router.delete('/:id', verify, function(req, res) {
    methods.del(req.params.id, res, Student)
        .then((msg) => res.status(200).send(msg))
        .catch((err) => {
            if (err.name === StatusError.name) res.status(err.status).send(err.message);
            else res.status(500).send(err);
        });
});

/**
 * Gets all submissions of a student by id.
 * @param {string} req.params.id: ID of a student.
 * @returns {Array} of @see {Submission}
 * @throws 400
 * @throws 404
 * @throws 500
 */
router.get('/:id/submissions', verify, function(req, res) {
    Submission.find({'student': req.params.id}, (err, subs) => {
        if (err) res.status(400).send(err);
        res.send(subs);
    });
});

/**
 * Gets all courses of a student by id.
 * @param {string} req.params.id: ID of a student.
 * @returns {Array} of @see {Courses}
 * @throws 400
 * @throws 404
 * @throws 500
 */
router.get('/:id/courses', verify, function(req, res) {
    Submission.find({'student': req.params.id}, (err, subs) => {
        let ids = subs.map((s) => s._id);
        if (err) res.status(400).send(err);
        Sheet.find()
            .where('submissions')
            .in(ids)
            .exec((err, sheets) => {
                if (err) res.status(400).send(err);
                ids = sheets.map((s) => s._id);
                Course.find().where('sheets').in(ids).exec((err, docs) => {
                    if (err) res.status(400).send(err);
                    res.send(docs);
                });
            });
    });
});

export default router;