/**
 * @overview The routing of the courses API.
 * @author Thomas Oswald
 */

import express from 'express';
import verify from '../auth/verification';
import * as methods from '../utils/methods';
import {StatusError} from '../utils/errors';
import {Course} from '../models/course';
import {Sheet} from '../models/sheet';
import {Student} from '../models/submission';
import {logRoute} from '../utils/log';

const router = express.Router();
router.get('/', verify, function(req, res, next) {
    methods.getAll(Course).then((docs) => {
        res.status(200).send(docs);
        next();
    }).catch((err) => {
        if (err.name === StatusError.name) res.status(err.status).send(err.message);
        else res.status(500).send(err);
        req.error = err;
        next();
    });
}, logRoute);

/**
 * Searches through all courses with a sheetID and returns found courses.
 * @param {string} req.query.sheet: id of a {Sheet}.
 * @returns {Array} of {Course}
 * @throws 400
 * @throws 404
 * @throws 500
 * @example courses/_search?sheet={ID}
 */
router.get('/_search', verify, function(req, res, next) {
    let sheetId = req.query.sheet;
    if (sheetId !== undefined) {
        Course.find().where('sheets').in(sheetId).exec().then((docs) => {
            res.send(docs);
            next();
        }).catch((err) => {
            res.status(500).send(err);
            req.error = err;
            next();
        });
    }
});

/**
 * Gets a course by id.
 * @param {string} req.params.id: ID of a course.
 * @returns {Course}
 * @throws 400
 * @throws 404
 * @throws 500
 */
router.get('/:id', verify, function(req, res, next) {
    methods.get(req.params.id, Course)
        .then((doc) => {
            let sheetsNameAndId = [];
            let promises = [];
            for (let sheetId of doc.sheets) {
                promises.push(Sheet.findById(sheetId).exec().then((sheet) => {
                    sheetsNameAndId.push({id: sheetId, name: sheet.name});
                }).catch((err) => {
                    req.error = err;
                    next();
                }));
            }
            Promise.all(promises).then(() => {
                let obj = JSON.parse(JSON.stringify(doc));
                obj.sheets = sheetsNameAndId;
                res.status(200).send(obj);
                next();
            }).catch((err) => {
                if (err.name === StatusError.name) res.status(err.status).send(err.message);
                else res.status(500).send(err);
                req.error = err;
                next();
            });
        })
        .catch((err) => {
            if (err.name === StatusError.name) res.status(err.status).send(err.message);
            else res.status(500).send(err);
            req.error = err;
            next();
        });
});

/**
 * Creates one or many courses.
 * @param {Array|Course} req.body Array of or single course.
 * @returns {Array|Course} {Course}
 * @throws 400
 * @throws 404
 * @throws 500
 */
router.post('/', verify, function(req, res, next) {
    methods.post(req.body, Course)
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
});

/**
 * Updates a course by id.
 * @param {string} req.params.id: ID of a course.
 * @param {Course} req.body with updated values.
 * @returns {Course}
 * @throws 400
 * @throws 404
 * @throws 500
 */
router.put('/:id', verify, function(req, res, next) {
    methods.put(req.params.id, req.body, Course)
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
});

/**
 * Deletes a course by id.
 * @param {string} req.params.id: ID of a course.
 * @returns {string} success message.
 * @throws 400
 * @throws 404
 * @throws 500
 */
router.delete('/:id', verify, function(req, res, next) {
    methods.del(req.params.id, Course)
        .then(() => {
            res.status(200).send();
            next();
        })
        .catch((err) => {
            if (err.name === StatusError.name) res.status(err.status).send(err.message);
            else res.status(500).send(err);
            req.error = err;
            next();
        });
});

/**
 * Gets all students of a course by id.
 * @param {string} req.params.id: ID of a course.
 * @returns {Array} of {Student}
 * @throws 400
 * @throws 404
 * @throws 500
 */
router.get('/:id/students', verify, function(req, res, next) {
    let err;
    methods.get(req.params.id, Course, { path: 'sheets', populate: { path: 'submissions' } })
        .then((course) => {
            if (course.sheets === undefined || course.sheets.length === 0) {
                err = new Error('No sheets found');
                res.status(404).send(err);
                req.error = err;
                next();
            }
            let subs = course.sheets.map((s) => s.submissions).map((array, i) => array[i]);
            if (subs === undefined || subs.length === 0) {
                err = new Error('No submissions found');
                res.status(404).send(err);
                req.error = err;
                next();
            }
            Student.find().where('_id').in(subs.map((s) => s.student)).exec().then((students) => {
                if (students === undefined || students.length === 0) {
                    err = new Error('No students found');
                    res.status(404).send(err);
                    req.error = err;
                    next();
                }
                res.send(students);
                next();
            }).catch((err) => {
                res.status(400).send(err);
                req.error = err;
                next();
            });
        }).catch((err) => {
            if (err.name === StatusError.name) res.status(err.status).send(err.message);
            else res.status(500).send(err);
            req.error = err;
            next();
        });
});

/**
 * Gets all sheets of a course by id.
 * @param {string} req.params.id: ID of a course.
 * @returns {Array} of {Sheet}
 * @throws 400
 * @throws 404
 * @throws 500
 */
router.get('/:id/sheets', verify, function(req, res, next) {
    methods.deepGet(req.params.id, Course, Sheet)
        .then((docs) => {
            res.status(200).send(docs);
            next();
        })
        .catch((err) => {
            if (err.name === StatusError.name) res.status(err.status).send(err.message);
            else res.status(500).send(err);
            req.error = err;
            next();
        });
});
/**
 * Creates one or many sheets.
 * @param {Array|Sheet} req.body Array of sheets or single sheet.
 * @returns {Array|Sheet} {Sheet}
 * @throws 400
 * @throws 404
 * @throws 500
 */
router.post('/:id/sheets', verify, function(req, res, next) {
    methods.deepPost(req.params.id, req.body, Course, Sheet)
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
});

export default router;