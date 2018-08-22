import express from 'express';
import verify from '../auth/verify';
import * as utils from './utils';
import {Solution} from '../models/sheet';

const router = express.Router();

router.put('/:id', verify, function(req, res) {
    utils.put(req.params.id, req.body, res, Solution);
});

router.delete('/:id', verify, function(req, res) {
    utils.del(req.params.id, res, Solution);
});

export default router;