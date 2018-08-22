import express from 'express';
import verify from '../auth/verify';
import * as utils from './utils';
import {User, Role} from '../models/user';

const router = express.Router();

router.get('/', verify, function(req, res) {
    utils.getAll(req, res, User);
});

router.post('/', verify, function(req, res) {
    let data = req.body;
    if (!(data instanceof Array)) data = [data];
    let promises = [];
    for (let item of data) {
        // TODO: nested objects -> nested models
        if (('role' in item) === true) res.status(400).send('This object has a role. Currently there is no support for nested objects.');
        else promises.push(User.create(item));
    }
    Promise.all(promises).then((response) => {
        res.status(200).send(response);
    }).catch((err) => {
        if (err) res.status(400).send(err);
    });
});

router.get('/:id', verify, function(req, res) {
    utils.get(req.params.id, res, User, 'role');
});

router.put('/:id', verify, function(req, res) {
    utils.put(req.params.id, req.body, res, User);
});

router.delete('/:id', verify, function(req, res) {
    utils.del(req.params.id, User);
});

export default router;