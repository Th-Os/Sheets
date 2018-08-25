import express from 'express';
import verify from '../auth/verify';
import * as methods from './methods';
import {Solution} from '../models/sheet';

const router = express.Router();

router.put('/:id', verify, function(req, res) {
    methods.put(req.params.id, req.body, res, Solution);
});

router.delete('/:id', verify, function(req, res) {
    methods.del(req.params.id, res, Solution);
});

export default router;