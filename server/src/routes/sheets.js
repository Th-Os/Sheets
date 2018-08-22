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
    res.send('Post exercises not implemented yet');
});

router.post('/:id/submissions', verify, function(req, res) {
    res.send('Post submissions not implemented yet');
});

router.get('/:id/submissions', verify, function(req, res) {
    utils.get(req.params.id, res, Sheet, 'submissions.submission');
});

router.delete('/:id/submissions', verify, function(req, res) {
    res.send('Delete submissions not implemented yet');
});

router.get('/:id/export/', verify, function(req, res) {
    res.redirect('../../export/pdf/' + req.params.id);
    // res.download()
});

router.get('/:id/csv', verify, function(req, res) {
    res.redirect('../../export/csv/' + req.params.id);
    res.send('Export csv not implemented yet');
});

router.get('/:id/template', verify, function(req, res) {
    res.redirect('../../export/template/' + req.params.id);
});

export default router;