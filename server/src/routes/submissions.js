import express from 'express';
import verify from '../auth/verify';
import * as utils from './utils';
import {Submission} from '../models/submission';

const router = express.Router();

router.get('/:id/answers', verify, function(req, res) {
    utils.get(req.params.id, res, Submission, 'answers.answer');
});

export default router;