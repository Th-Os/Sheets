import express from 'express';
import verify from '../auth/verify';
import * as utils from './utils';
import {Task} from '../models/sheet';

const router = express.Router();

router.put('/:id', verify, function(req, res) {
    utils.put(req.params.id, req.body, res, Task);
});

router.delete('/:id', verify, function(req, res) {
    utils.del(req.params.id, res, Task);
});

router.get('/:id/solutions', verify, function(req, res) {
    utils.get(req.params.id, res, Task, 'solution');
});

router.post('/:id/solutions', verify, function(req, res) {
    res.send('Post solutions to task not implemented yet');
});

export default router;