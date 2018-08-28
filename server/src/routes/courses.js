import express from 'express';
import verify from '../auth/verify';
import * as methods from './methods';
import {Course} from '../models/course';
import {Sheet} from '../models/sheet';
import {Student, Submission} from '../models/submission';

const router = express.Router();
router.get('/', verify, function(req, res) {
    methods.getAll(res, Course, 'sheets.sheet');
});

router.post('/', verify, function(req, res) {
    methods.post(req.body, res, Course);
});

router.put('/:id', verify, function(req, res) {
    methods.put(req.params.id, req.body, res, Course);
});

router.delete('/:id', verify, function(req, res) {
    methods.del(req.params.id, res, Course);
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
    methods.deepGet(req.params.id, res, Course, Sheet);
});

router.post('/:id/sheets', verify, function(req, res) {
    methods.deepPost(req.params.id, req.body, res, Course, Sheet);
});

export default router;