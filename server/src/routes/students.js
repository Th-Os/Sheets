import express from 'express';
import verify from '../auth/verify';
import * as utils from './utils';
import {Student, Submission} from '../models/submission';
import {Sheet} from '../models/sheet';
import {Course} from '../models/course';

const router = express.Router();

router.get('/:id', verify, function(req, res) {
    utils.get(req.params.id, res, Student);
});

router.post('/', verify, function(req, res) {
    utils.post(req.body, res, Student);
});

router.put('/:id', verify, function(req, res) {
    utils.put(req.params.id, req.body, res, Student);
});

router.delete('/:id', verify, function(req, res) {
    utils.del(req.params.id, res, Student);
});

// Test
router.get('/:id/submissions', verify, function(req, res) {
    Submission.find({'student': req.params.id}, (err, subs) => {
        if (err) res.status(400).send(err);
        res.send(subs);
    });
});

// Test
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