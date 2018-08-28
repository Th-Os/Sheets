import express from 'express';
import verify from '../auth/verify';
import * as methods from './methods';
import {Exercise, Task} from '../models/sheet';

const router = express.Router();

router.put('/:id', verify, function(req, res) {
    methods.put(req.params.id, req.body, res, Exercise);
});

router.delete('/:id', verify, function(req, res) {
    methods.del(req.params.id, res, Exercise);
});

router.get('/:id/tasks', verify, function(req, res) {
    methods.get(req.params.id, res, Exercise, 'tasks.task');
});

// Test
router.post('/:id/tasks', verify, function(req, res) {
    methods.deepPost(req.params.id, req.body, res, Exercise, Task);
});

export default router;