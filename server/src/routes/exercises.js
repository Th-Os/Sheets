import express from 'express';
import verify from '../auth/verify';
import * as methods from '../utils/methods';
import {StatusError} from '../utils/error';
import {Exercise, Task} from '../models/sheet';

const router = express.Router();

router.get('/:id', verify, function(req, res) {
    Exercise.findById(req.params.id).exec()
        .then( doc => res.status(200).send(doc) )
        .catch( err => res.status(500).send(err) );
});

router.get('/:id/_aggregate', verify, function(req, res) {
    Exercise.findById(req.params.id).populate({
        path: 'exercises',
        model: 'Exercise',
        populate:
            {
                path: 'tasks',
                model: 'Task',
                populate: { path: 'solution' }
            }
    }).exec().then((doc) => {
        res.send(doc);
    }).catch((err) => res.status(500).send(err));
});

router.put('/:id', verify, function(req, res) {
    methods.put(req.params.id, req.body, Exercise)
        .then((doc) => res.status(200).send(doc))
        .catch((err) => {
            if (err.name === StatusError.name) res.status(err.status).send(err.message);
            else res.status(500).send(err);
        });
});

router.delete('/:id', verify, function(req, res) {
    methods.del(req.params.id, Exercise)
        .then((doc) => res.status(200).send(doc))
        .catch((err) => {
            if (err.name === StatusError.name) res.status(err.status).send(err.message);
            else res.status(500).send(err);
        });
});

router.get('/:id/tasks', verify, function(req, res) {
    methods.deepGet(req.params.id, Exercise, Task)
        .then((doc) => res.status(200).send(doc))
        .catch((err) => {
            if (err.name === StatusError.name) res.status(err.status).send(err.message);
            else res.status(500).send(err);
        });
});

router.post('/:id/tasks', verify, function(req, res) {
    methods.deepPost(req.params.id, req.body, Exercise, Task)
        .then((doc) => res.status(200).send(doc))
        .catch((err) => {
            if (err.name === StatusError.name) res.status(err.status).send(err.message);
            else res.status(500).send(err);
        });
});

export default router;