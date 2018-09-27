import express from 'express';
import verify from '../auth/verification';
import * as methods from '../utils/methods';
import {StatusError} from '../utils/errors';
import {Student, Submission} from '../models/submission';
import {Sheet} from '../models/sheet';
import {Course} from '../models/course';

const router = express.Router();

router.get('/_search', verify, function(req, res) {
    let id = req.query.matnr;
    if (id !== undefined) {
        Student.find({'mat_nr': id}).exec().then((students) => {
            if (students === null || students.length === 0) res.status(404).send('Found no student with mat_nr: ' + id);
            else if (students.length >= 1) res.status(500).send('Found more than one student with mat_nr: ' + id);
            else res.send(students[0]);
        });
    } else {
        res.status(400).send('The query: ' + Object.keys(req.query)[0] + ' does not exist.');
    }
});

router.get('/:id', verify, function(req, res) {
    methods.get(req.params.id, Student)
        .then((doc) => res.status(200).send(doc))
        .catch((err) => {
            if (err.name === StatusError.name) res.status(err.status).send(err.message);
            else res.status(500).send(err);
        });
});

router.post('/', verify, function(req, res) {
    methods.post(req.body, Student)
        .then((doc) => res.status(200).send(doc))
        .catch((err) => {
            if (err.name === StatusError.name) res.status(err.status).send(err.message);
            else res.status(500).send(err);
        });
});

router.put('/:id', verify, function(req, res) {
    methods.put(req.params.id, req.body, Student)
        .then((doc) => res.status(200).send(doc))
        .catch((err) => {
            if (err.name === StatusError.name) res.status(err.status).send(err.message);
            else res.status(500).send(err);
        });
});

router.delete('/:id', verify, function(req, res) {
    methods.del(req.params.id, res, Student)
        .then((msg) => res.status(200).send(msg))
        .catch((err) => {
            if (err.name === StatusError.name) res.status(err.status).send(err.message);
            else res.status(500).send(err);
        });
});

router.get('/:id/submissions', verify, function(req, res) {
    Submission.find({'student': req.params.id}, (err, subs) => {
        if (err) res.status(400).send(err);
        res.send(subs);
    });
});

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