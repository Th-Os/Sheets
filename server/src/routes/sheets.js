import express from 'express';
import verify from '../auth/verify';
import * as utils from './utils';
import {Sheet, Exercise} from '../models/sheet';
import {Submission} from '../models/submission';

const router = express.Router();

router.put('/:id', verify, function(req, res) {
    utils.put(req.params.id, req.body, res, Sheet);
});

router.delete('/:id', verify, function(req, res) {
    utils.del(req.params.id, res, Sheet);
});

router.get('/:id/exercises', verify, function(req, res) {
    utils.get(req.params.id, res, Sheet, 'exercises.exercise');
});

router.post('/:id/exercises', verify, function(req, res) {
    Sheet.findById(req.params.id, (err, sheet) => {
        if (err) res.status(400).send(err);
        Exercise.create(req.body, (err, exercises) => {
            if (err) res.status(400).send(err);
            if (sheet.exercises === undefined) sheet.exercises = [];
            if (exercises instanceof Array) {
                for (let e of exercises) sheet.exercises.push(e._id);
            } else sheet.exercises.push(exercises._id);
            sheet.save((err, doc) => {
                if (err) res.status(400).send(err);
                res.send(doc);
            });
        });
    });
});

router.post('/:id/submissions', verify, function(req, res) {
    Sheet.findById(req.params.id, (err, sheet) => {
        if (err) res.status(400).send(err);
        Submission.create(req.body, (err, submissions) => {
            if (err) res.status(400).send(err);
            if (sheet.submissions === undefined) sheet.submissions = [];
            if (submissions instanceof Array) {
                for (let s of submissions) sheet.submissions.push(s._id);
            } else sheet.submissions.push(submissions._id);
            sheet.save((err, doc) => {
                if (err) res.status(400).send(err);
                res.send(doc);
            });
        });
    });
});

router.get('/:id/submissions', verify, function(req, res) {
    utils.get(req.params.id, res, Sheet, 'submissions.submission');
});

// Test
router.delete('/:id/submissions', verify, function(req, res) {
    Sheet.findById(req.params.id, (err, sheet) => {
        if (err) res.status(400).send(err);
        Submission.find({'_id': {$in: sheet.submissions}}, (err, subs) => {
            if (err) res.status(400).send(err);
            for (let s of subs) s.remove();
            res.send(subs);
        });
    });
});

router.get('/:id/export/', verify, function(req, res) {
    res.redirect('../../export/pdf/' + req.params.id);
});

router.get('/:id/csv', verify, function(req, res) {
    res.redirect('../../export/csv/' + req.params.id);
});

router.get('/:id/template', verify, function(req, res) {
    res.redirect('../../export/template/' + req.params.id);
});

export default router;