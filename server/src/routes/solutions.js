import express from 'express';
import verify from '../auth/verify';
import * as methods from '../utils/methods';
import {StatusError} from '../utils/error';
import {Solution} from '../models/sheet';

const router = express.Router();

router.put('/:id', verify, function(req, res) {
    methods.put(req.params.id, req.body, Solution)
        .then((doc) => res.status(200).send(doc))
        .catch((err) => {
            if (err.name === StatusError.name) res.status(err.status).send(err.message);
            else res.status(500).send(err);
        });
});

router.delete('/:id', verify, function(req, res) {
    methods.del(req.params.id, Solution)
        .then((doc) => res.status(200).send(doc))
        .catch((err) => {
            if (err.name === StatusError.name) res.status(err.status).send(err.message);
            else res.status(500).send(err);
        });
});

export default router;