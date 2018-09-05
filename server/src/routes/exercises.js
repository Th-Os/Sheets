import express from 'express';
import verify from '../auth/verify';
import * as methods from '../utils/methods';
import {StatusError} from '../utils/error';
import {Exercise, Task} from '../models/sheet';

const router = express.Router();

router.put('/:id', verify, function(req, res) {
    methods.put(req.params.id, req.body, Exercise)
        .then((doc) => res.status(200).send(doc))
        .catch((err) => {
            if (err instanceof StatusError) res.status(err.status).send(err.message);
            else res.status(500).send(err);
        });
});

router.delete('/:id', verify, function(req, res) {
    methods.del(req.params.id, Exercise)
        .then((doc) => res.status(200).send(doc))
        .catch((err) => {
            if (err instanceof StatusError) res.status(err.status).send(err.message);
            else res.status(500).send(err);
        });
});

router.get('/:id/tasks', verify, function(req, res) {
    methods.get(req.params.id, Exercise)
        .then((doc) => res.status(200).send(doc))
        .catch((err) => {
            if (err instanceof StatusError) res.status(err.status).send(err.message);
            else res.status(500).send(err);
        });
});

// Test
router.post('/:id/tasks', verify, function(req, res) {
    methods.deepPost(req.params.id, req.body, Exercise, Task)
        .then((doc) => res.status(200).send(doc))
        .catch((err) => {
            if (err instanceof StatusError) res.status(err.status).send(err.message);
            else res.status(500).send(err);
        });
});

export default router;