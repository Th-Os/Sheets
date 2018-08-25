import express from 'express';
import verify from '../auth/verify';
import * as methods from './methods';
import {Sheet, Exercise} from '../models/sheet';
import {Submission} from '../models/submission';

const router = express.Router();

router.put('/:id', verify, function(req, res) {
    methods.put(req.params.id, req.body, res, Sheet);
});

router.delete('/:id', verify, function(req, res) {
    methods.del(req.params.id, res, Sheet);
});

router.get('/:id/exercises', verify, function(req, res) {
    methods.deepGet(req.params.id, res, Sheet, Exercise);
});

router.post('/:id/exercises', verify, function(req, res) {
    methods.deepPost(req.params.id, req.body, res, Sheet, Exercise);
});

router.post('/:id/submissions', verify, function(req, res) {
    methods.deepPost(req.params.id, req.body, res, Sheet, Submission);
});

router.get('/:id/submissions', verify, function(req, res) {
    methods.deepGet(req.params.id, res, Sheet, Submission);
});

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