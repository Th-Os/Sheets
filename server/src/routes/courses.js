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

router.get('/:id/students', verify, function(req, res) {
    Course.findById(req.params.id).populate('sheets.sheet').exec(function(err, course) {
        if (err) res.status(400).send(err);
        console.log(course);
        res.send('Not implemented yet.');
    });
});

router.get('/:id/sheets', verify, function(req, res) {
    utils.get(req.params.id, res, Course, 'sheets.sheet');
});

router.post('/:id/sheets', verify, function(req, res) {
    Course.findById(req.params.id).populate('sheets.sheet').exec(function(err, course) {
        if (err) res.status(400).send(err);
        if (course === null) res.status(404).send('No course found');
        course.sheets.push(req.body);
        course.save(function(err, course) {
            if (err) res.status(400).send(err);
            res.status(200).send(course.sheets);
        });
    });
});

export default router;