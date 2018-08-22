import express from 'express';
import verify from '../auth/verify';
import * as utils from './utils';
import {Course} from '../models/course';
import {Sheet, Task, Solution} from '../models/sheet';
import {Student, Submission, Answer} from '../models/submission';

const router = express.Router();
router.get('/', verify, function(req, res) {
    utils.getAll(res, Course, 'sheets.sheet');
});

router.post('/', verify, function(req, res) {
    let data = req.body;
    if (!(data instanceof Array)) data = [data];
    let promises = [];
    for (let item of data) {
        // TODO: nested objects -> nested models
        if (('sheets' in item) === true) res.status(400).send('This object has sheets. Currently there is no support for nested objects.');
        else promises.push(Course.create(item));
    }
    Promise.all(promises).then((response) => {
        res.status(200).send(response);
    }).catch((err) => {
        if (err) res.status(400).send(err);
    });
});

router.put('/:id', verify, function(req, res) {
    utils.put(req.params.id, req.body, res, Course);
});

router.delete('/:id', verify, function(req, res) {
    utils.del(req.params.id, res, Course);
});

// Test
router.get('/:id/students', verify, function(req, res) {
    Course.findById(req.params.id, (err, course) => {
        if (err) res.status(400).send(err);
        Sheet.find().where('_id').in(course.sheets).exec((err, sheets) => {
            if (err) res.status(400).send(err);
            Submission.find().where('_id').in(sheets.submissions).exec((err, subs) => {
                if (err) res.status(400).send(err);
                Student.find().where('id').in(subs.map((s) => s.student)).exec((err, students) => {
                    if (err) res.status(400).send(err);
                    res.send(students);
                });
            });
        });
    });
});

router.get('/:id/sheets', verify, function(req, res) {
    utils.get(req.params.id, res, Course, 'sheets.sheet');
});

// Test
router.post('/:id/sheets', verify, function(req, res) {
    Course.findById(req.params.id, (err, course) => {
        if (err) res.status(400).send(err);
        if (course === null) res.status(404).send('No course found');
        Sheet.create(req.body, (err, docs) => {
            if (err) res.status(400).send(err);
            if (course.sheets === undefined) course.sheets = [];
            if (docs instanceof Array) {
                for (let doc of docs) {
                    course.sheets.push(doc._id);
                }
            } else course.sheets.push(docs._id);
            course.save((err, doc) => {
                if (err) res.status(400).send(err);
                res.status(200).send(doc);
            });
        });
    });
});

export default router;