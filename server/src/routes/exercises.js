import express from 'express';
import verify from '../auth/verify';
import * as utils from './utils';
import {Exercise, Task} from '../models/sheet';

const router = express.Router();

router.put('/:id', verify, function(req, res) {
    utils.put(req.params.id, req.body, res, Exercise);
});

router.delete('/:id', verify, function(req, res) {
    utils.del(req.params.id, res, Exercise);
});

router.get('/:id/tasks', verify, function(req, res) {
    utils.get(req.params.id, res, Exercise, 'tasks.task');
});

router.post('/:id/tasks', verify, function(req, res) {
    Exercise.findById(req.params.id).populate('tasks.task').exec(function(err, exercise) {
        if (err) res.status(400).send(err);
        exercise.tasks.push(req.body);
        exercise.save(function(err, response) {
            if (err) res.status(400).send(err);
            else res.status(200).send(response);
        });
    });
});

export default router;