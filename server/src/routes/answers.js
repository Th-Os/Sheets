import express from 'express';
import verify from '../auth/verification';
import * as methods from '../utils/methods';
import {StatusError} from '../utils/errors';
import {Answer} from '../models/submission';

const router = express.Router();

router.get('/:id', verify, function(req, res) {
    methods.get(req.params.id, Answer)
        .then((doc) => res.status(200).send(doc))
        .catch((err) => {
            if (err.name === StatusError.name) res.status(err.status).send(err.message);
            else res.status(500).send(err);
        });
});

export default router;