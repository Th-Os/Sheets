import express from 'express';
import verify from '../auth/verify';
import * as methods from '../utils/methods';
import {User, Role} from '../models/user';
import { StatusError } from '../utils/error';

const router = express.Router();

router.get('/', verify, function(req, res) {
    methods.getAll(User)
        .then((docs) => res.status(200).send(docs))
        .catch((err) => {
            if (err.name === StatusError.name) res.status(err.status).send(err.message);
            else res.status(500).send(err);
        });
});

router.get('/roles', verify, function(req, res) {
    res.send(Role.schema.tree.name.enum);
});

router.post('/', verify, function(req, res) {
    let data = req.body;
    if (!(data instanceof Array)) data = [data];
    let promises = [];
    for (let item of data) {
        if (('role' in item) === true) {
            Role.create(item.role, (err, doc) => {
                if (err) res.status(400).send(err);
                item.role = doc._id;
                promises.push(User.create(item));
            });
        } else promises.push(User.create(item));
    }
    Promise.all(promises).then((response) => {
        res.status(200).send(response);
    }).catch((err) => {
        if (err) res.status(400).send(err);
    });
});

router.get('/:id', verify, function(req, res) {
    methods.get(req.params.id, User, { path: 'role' })
        .then((doc) => res.status(200).send(doc))
        .catch((err) => {
            if (err.name === StatusError.name) res.status(err.status).send(err.message);
            else res.status(500).send(err);
        });
});

router.put('/:id', verify, function(req, res) {
    methods.put(req.params.id, req.body, User)
        .then((doc) => res.status(200).send(doc))
        .catch((err) => {
            if (err.name === StatusError.name) res.status(err.status).send(err.message);
            else res.status(500).send(err);
        });
});

router.delete('/:id', verify, function(req, res) {
    methods.del(req.params.id, User)
        .then((msg) => res.status(200).send(msg))
        .catch((err) => {
            if (err.name === StatusError.name) res.status(err.status).send(err.message);
            else res.status(500).send(err);
        });
});

export default router;