import express from 'express';
import verify from '../auth/verify';
import * as utils from './utils';
import {Task, Solution} from '../models/sheet';

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

// Test
router.post('/:id/solutions', verify, function(req, res) {
    Task.findById(req.params.id, (err, task) => {
        if (err) res.status(400).send(err);
        if (task === null) res.status(404).send('No task found');
        Solution.create(req.body, (err, doc) => {
            if (err) res.status(400).send(err);
            if (doc instanceof Array) {
                res.status(400).send('No array allowed.');
            } else task.solution = doc._id;
            task.save((err, doc) => {
                if (err) res.status(400).send(err);
                res.status(200).send(doc);
            });
        });
    });
});

export default router;