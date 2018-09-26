import express from 'express';
import verify from '../auth/verification';
import * as methods from '../utils/methods';
import {StatusError} from '../utils/errors';
import {Task, Solution} from '../models/sheet';

const router = express.Router();

router.get('/:id/_aggregate', verify, function(req, res) {
    Task.findById(req.params.id).populate({ path: 'solution' }).exec().then((doc) => {
        res.send(doc);
    }).catch((err) => res.status(500).send(err));
});

router.put('/:id', verify, function(req, res) {
    methods.put(req.params.id, req.body, Task)
        .then((doc) => res.status(200).send(doc))
        .catch((err) => {
            if (err.name === StatusError.name) res.status(err.status).send(err.message);
            else res.status(500).send(err);
        });
});

router.delete('/:id', verify, function(req, res) {
    methods.del(req.params.id, Task)
        .then((doc) => res.status(200).send(doc))
        .catch((err) => {
            if (err.name === StatusError.name) res.status(err.status).send(err.message);
            else res.status(500).send(err);
        });
});

router.get('/:id/solutions', verify, function(req, res) {
    methods.deepGet(req.params.id, Task, Solution, true)
        .then((docs) => res.status(200).send(docs))
        .catch((err) => {
            if (err.name === StatusError.name) res.status(err.status).send(err.message);
            else res.status(500).send(err);
        });
});

router.post('/:id/solutions', verify, function(req, res) {
    methods.deepPost(req.params.id, req.body, Task, Solution, true)
        .then((docs) => res.status(200).send(docs))
        .catch((err) => {
            if (err.name === StatusError.name) res.status(err.status).send(err.message);
            else res.status(500).send(err);
        });
});

export default router;