import express from 'express';
import fs from 'fs';
import path from 'path';
import verify from '../auth/verify';
import PDF from '../export/pdf';
import {Course} from '../models/course';
import {Sheet} from '../models/sheet';

const router = express.Router();

router.get('/pdf/:id', verify, function(req, res) {
    fs.readFile(path.join(__dirname, '../../resources/pdf.html'), 'utf8', function(err, html) {
        if (err) res.status(400).send(err);
        let sheetId = req.params.id;
        let obj = {};
        Course.find({sheets: sheetId}).exec((err, docs) => {
            if (err) res.status(400).send(err);
            if (docs === undefined || docs.length === 0) if (err) res.status(404).send('Course not found');
            obj.course = docs[0];
            Sheet.findById(sheetId, (err, doc) => {
                if (err) res.status(400).send(err);
                if (docs === undefined) if (err) res.status(404).send('Sheet not found');
                obj.sheet = doc;
                new PDF().data(JSON.stringify(obj)).html(html).send(res);
            });
        });
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