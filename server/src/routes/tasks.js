import express from 'express';
import verify from '../auth/verify';
import * as methods from './methods';
import {Task, Solution} from '../models/sheet';

const router = express.Router();

router.put('/:id', verify, function(req, res) {
    methods.put(req.params.id, req.body, res, Task);
});

router.delete('/:id', verify, function(req, res) {
    methods.del(req.params.id, res, Task);
});

router.get('/:id/solutions', verify, function(req, res) {
    methods.get(req.params.id, res, Task, 'solution');
});

router.post('/:id/solutions', verify, function(req, res) {
    methods.deepPost(req.params.id, req.body, res, Task, Solution, true);
});

export default router;