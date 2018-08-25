import express from 'express';
import verify from '../auth/verify';
import * as methods from './methods';
import {User, Role} from '../models/user';

const router = express.Router();

router.get('/', verify, function(req, res) {
    methods.getAll(req, res, User);
});

// TODO: response is an empty array.
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
    methods.get(req.params.id, res, User, 'role');
});

router.put('/:id', verify, function(req, res) {
    methods.put(req.params.id, req.body, res, User);
});

router.delete('/:id', verify, function(req, res) {
    methods.del(req.params.id, User);
});

export default router;