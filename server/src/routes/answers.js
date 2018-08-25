import express from 'express';
import verify from '../auth/verify';
import * as methods from './methods';
import {Answer} from '../models/submission';

const router = express.Router();

router.get('/:id', verify, function(req, res, next) {
    methods.get(req.params.id, res, Answer, 'task');
});

export default router;