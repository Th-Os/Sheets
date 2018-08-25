import express from 'express';
import fs from 'fs';
import path from 'path';
import verify from '../auth/verify';
import PDF from '../export/pdf';
import {Sheet} from '../models/sheet';

const router = express.Router();

router.get('/pdf/:id', verify, function(req, res) {
    fs.readFile(path.join(__dirname, '../../resources/pdf.html'), 'utf8', function(err, html) {
        if (err) res.status(400).send(err);
        new PDF().html(html).send(res);
    });
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