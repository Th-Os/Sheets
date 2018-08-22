import express from 'express';
import verify from '../auth/verify';
import * as utils from './utils';
import {Student} from '../models/submission';

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

router.get('/:id/submissions', verify, function(req, res) {
    res.send('get student submissions not implemented yet');
});

router.get('/:id/courses', verify, function(req, res) {
    res.send('get student courses not implemented yet');
});

export default router;