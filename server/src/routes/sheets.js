import express from 'express';
import verify from '../auth/verify';
import * as methods from '../utils/methods';
import {StatusError} from '../utils/error';
import {Sheet, Exercise} from '../models/sheet';
import {Submission} from '../models/submission';

const router = express.Router();

router.get('/:id', verify, function (req, res) {
    methods.get(req.params.id, Sheet)
        .then((doc) => res.status(200).send(doc))
        .catch((err) => {
            if (err instanceof StatusError) res.status(err.status).send(err.message);
            else res.status(500).send(err);
        });
});

router.put('/:id', verify, function(req, res) {
    methods.put(req.params.id, req.body, Sheet)
        .then((doc) => res.status(200).send(doc))
        .catch((err) => {
            if (err instanceof StatusError) res.status(err.status).send(err.message);
            else res.status(500).send(err);
        });
});

router.delete('/:id', verify, function(req, res) {
    methods.del(req.params.id, Sheet)
        .then((doc) => res.status(200).send(doc))
        .catch((err) => {
            if (err instanceof StatusError) res.status(err.status).send(err.message);
            else res.status(500).send(err);
        });
});

router.get('/:id/exercises', verify, function(req, res) {
    methods.deepGet(req.params.id, Sheet, Exercise)
        .then((docs) => res.status(200).send(docs))
        .catch((err) => {
            if (err instanceof StatusError) res.status(err.status).send(err.message);
            else res.status(500).send(err);
        });
});

router.post('/:id/exercises', verify, function(req, res) {
    methods.deepPost(req.params.id, req.body, Sheet, Exercise)
        .then((docs) => res.status(200).send(docs))
        .catch((err) => {
            if (err instanceof StatusError) res.status(err.status).send(err.message);
            else res.status(500).send(err);
        });
});

router.post('/:id/submissions', verify, function(req, res) {
    methods.deepPost(req.params.id, req.body, Sheet, Submission)
        .then((docs) => res.status(200).send(docs))
        .catch((err) => {
            if (err instanceof StatusError) res.status(err.status).send(err.message);
            else res.status(500).send(err);
        });
});

router.get('/:id/submissions', verify, function(req, res) {
    methods.deepGet(req.params.id, Sheet, Submission)
        .then((docs) => res.status(200).send(docs))
        .catch((err) => {
            if (err instanceof StatusError) res.status(err.status).send(err.message);
            else res.status(500).send(err);
        });
});

router.delete('/:id/submissions', verify, function(req, res) {
    console.log("delete submissions")
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