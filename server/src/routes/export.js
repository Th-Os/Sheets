import express from 'express';
import verify from '../auth/verify';
import {Sheet} from '../models/sheet';

const router = express.Router();

router.get('/pdf/:id', verify, function(req, res) {
    res.send('not implemented yet');
});

router.get('/word/:id', verify, function(req, res) {
    res.send('not implemented yet');
});

router.get('/csv/:id', verify, function(req, res) {
    res.send('not implemented yet');
});

router.get('/template/:id', verify, function(req, res) {
    res.send('not implemented yet');
});

export default router;