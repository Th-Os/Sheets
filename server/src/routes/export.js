import express from 'express';
import fs from 'fs';
import path from 'path';
import verify from '../auth/verify';
import PDF from '../export/pdf';
import {Sheet} from '../models/sheet';

const router = express.Router();

const sheet =
        {
            name: 'Exercise Sheet',
            submissiondate: '2016-05-18 10:00:00.000',
            min_req_points: 10,
            submissions: [],
            exercises: [
                {
                    name: 'Übung 1',
                    description: 'Aufgabenbeschreibung',
                    tasks: [
                        {
                            question: 'Frage',
                            points: 10,
                            order: 1,
                            choices: '1|2|3'
                        },
                        {
                            question: 'Frage',
                            points: 10,
                            order: 2,
                            choices: '1|2|3'
                        }
                    ],
                    order: 1
                },
                {
                    name: 'Übung 2',
                    description: 'Aufgabenbeschreibung',
                    tasks: [
                        {
                            question: 'Frage',
                            points: 10,
                            order: 1,
                            choices: '1|2|3'
                        },
                        {
                            question: 'Frage',
                            points: 10,
                            order: 2,
                            choices: '1|2|3'
                        }
                    ],
                    order: 1
                }
            ]
        };

router.get('/pdf/:id', verify, function(req, res) {
    fs.readFile(path.join(__dirname, '../../resources/pdf.html'), 'utf8', function(err, html) {
        if (err) res.status(400).send(err);
        new PDF().data(sheet).html(html).send(res);
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