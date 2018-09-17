import express from 'express';
import verify from '../auth/verify';
import * as methods from '../utils/methods';
import {StatusError} from '../utils/error';
import {Submission, Answer} from '../models/submission';

const router = express.Router();

router.get('/:id/answers', verify, function(req, res) {
    methods.get(req.params.id, Submission)
        .then((doc) => res.status(200).send(doc))
        .catch((err) => {
            if (err instanceof StatusError) res.status(err.status).send(err.message);
            else res.status(500).send(err);
        });
});

router.post('/:id/answers', verify, function(req, res) {
    methods.deepPost(req.params.id, req.body, Submission, Answer)
        .then((docs) => res.status(200).send(docs))
        .catch((err) => {
            if (err instanceof StatusError) res.status(err.status).send(err.message);
            else res.status(500).send(err);
        });
});

export default router;