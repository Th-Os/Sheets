import express from 'express';
import verify from '../auth/verify';
import * as methods from './methods';
import {Submission, Answer} from '../models/submission';

const router = express.Router();

router.get('/:id/answers', verify, function(req, res) {
    methods.get(req.params.id, res, Submission, 'answers.answer');
});

router.post('/:id/answers', verify, function(req, res) {
    methods.deepPost(req.params.id, req.body, res, Submission, Answer);
});

export default router;