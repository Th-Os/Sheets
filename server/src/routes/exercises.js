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

// Test
router.post('/:id/tasks', verify, function(req, res) {
    Exercise.findById(req.params.id, (err, exercise) => {
        if (err) res.status(400).send(err);
        if (exercise === null) res.status(404).send('No exercise found');
        Task.create(req.body, (err, docs) => {
            if (err) res.status(400).send(err);
            if (exercise.tasks === undefined) exercise.tasks = [];
            if (docs instanceof Array) {
                for (let doc of docs) {
                    exercise.tasks.push(doc._id);
                }
            } else exercise.tasks.push(docs._id);
            exercise.save((err, doc) => {
                if (err) res.status(400).send(err);
                res.status(200).send(doc);
            });
        });
    });
});

export default router;