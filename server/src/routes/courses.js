import express from 'express';
import verify from '../auth/verify';
import {Course} from '../models/course';
import {Sheet} from '../models/sheet';

const router = express.Router();
router.get('/:id', verify, function(req, res) {
    let id = req.params.id;
    Course.findById(id).populate('sheets.sheet').then((doc) => {
        res.status(200).send(doc);
    }).catch((err) => {
        if (err) res.status(400).send(err);
    });
});

router.post('/', verify, function(req, res) {
    res.send('Post course');
});

router.put('/:id', verify, function(req, res) {
    res.send('Put course');
});

router.delete('/:id', verify, function(req, res) {
    res.send('Delete course');
});

router.get('/:id/students', verify, function(req, res) {
    res.send('Get students of course');
});

router.get('/:id/sheets', verify, function(req, res) {
    res.send('Get sheets of course');
});

router.post('/:id/sheets', verify, function(req, res) {
    res.send('Post sheets to course');
});

export default router;