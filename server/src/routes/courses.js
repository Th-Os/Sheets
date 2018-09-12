import express from 'express';
import verify from '../auth/verify';
import * as methods from '../utils/methods';
import {StatusError} from '../utils/error';
import {Course} from '../models/course';
import {Sheet} from '../models/sheet';
import {Student, Submission} from '../models/submission';

const router = express.Router();
router.get('/', verify, function(req, res) {
    methods.getAll(Course).then((docs) => {
        res.status(200).send(docs);
    }).catch((err) => {
        res.status(err.status).send(err.message);
    });
});

router.get('/:id', verify, function(req, res) {
    methods.get(req.params.id, Course)
        .then((doc) => res.status(200).send(doc))
        .catch((err) => {
            if (err instanceof StatusError) res.status(err.status).send(err.message);
            else res.status(500).send(err);
        });
});

router.post('/', verify, function(req, res) {
    methods.post(req.body, Course)
        .then((doc) => res.status(200).send(doc))
        .catch((err) => {
            if (err instanceof StatusError) res.status(err.status).send(err.message);
            else res.status(500).send(err);
        });
});

router.put('/:id', verify, function(req, res) {
    methods.put(req.params.id, req.body, Course)
        .then((doc) => res.status(200).send(doc))
        .catch((err) => {
            if (err instanceof StatusError) res.status(err.status).send(err.message);
            else res.status(500).send(err);
        });
});

router.delete('/:id', verify, function(req, res) {
    methods.del(req.params.id, Course)
        .then((doc) => res.status(200).send(doc))
        .catch((err) => {
            if (err instanceof StatusError) res.status(err.status).send(err.message);
            else res.status(500).send(err);
        });
});

router.get('/:id/students', verify, function(req, res) {
    Course.findById(req.params.id, (err, course) => {
        if (err) res.status(400).send(err);
        if (course === undefined) res.status(404).send('No course found');
        Sheet.find().where('_id').in(course.sheets).exec((err, sheets) => {
            if (err) res.status(400).send(err);
            if (sheets === undefined || sheets.length === 0) res.status(404).send('No sheets found');
            let subIds = sheets.map((s) => s.submissions).map((array, i) => array[i]);
            Submission.find().where('_id').in(subIds).exec((err, subs) => {
                if (err) res.status(400).send(err);
                if (subs === undefined || subs.length === 0) res.status(404).send('No submissions found');
                Student.find().where('_id').in(subs.map((s) => s.student)).exec((err, students) => {
                    if (err) res.status(400).send(err);
                    if (students === undefined || students.length === 0) res.status(404).send('No students found');
                    res.send(students);
                });
            });
        });
    });
});

router.get('/:id/sheets', verify, function(req, res) {
    methods.deepGet(req.params.id, Course, Sheet)
        .then((docs) => res.status(200).send(docs))
        .catch((err) => {
            if (err instanceof StatusError) res.status(err.status).send(err.message);
            else res.status(500).send(err);
        });
});

router.post('/:id/sheets', verify, function(req, res) {
    methods.deepPost(req.params.id, req.body, Course, Sheet)
        .then((docs) => res.status(200).send(docs))
        .catch((err) => {
            if (err instanceof StatusError) res.status(err.status).send(err.message);
            else res.status(500).send(err);
        });
});

export default router;