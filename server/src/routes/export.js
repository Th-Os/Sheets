import express from 'express';
import fs from 'fs';
import path from 'path';
import verify from '../auth/verify';
import PDF from '../export/pdf';
import {Sheet} from '../models/sheet';

const router = express.Router();

// test data.
const course = {
    name: 'EIMI',
    faculty: 'Universität Regensburg, Lehrstuhl für Medieninformatik',
    semester: 'SoSe 2018',
    min_req_sheets: 3
};
const sheet =
        {
            name: 'Exercise Sheet',
            submissiondate: '2016-05-18 10:00:00.000',
            min_req_points: 10,
            order: 1,
            submissions: [],
            exercises: [
                {
                    name: 'Eine Übung',
                    description: 'Aufgabenbeschreibung',
                    tasks: [
                        {
                            question: 'Frage',
                            points: 10,
                            order: 1,
                            choices: ['1', '2', '3']
                        },
                        {
                            question: 'Frage',
                            points: 10,
                            order: 2,
                            choices: ['1', '2', '3']
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
                            choices: ['1', '2', '3']
                        },
                        {
                            question: 'Frage',
                            points: 10,
                            order: 2,
                            choices: ['1', '2', '3']
                        }
                    ],
                    order: 2
                },
                {
                    name: 'Einhaltung der Abgabekriterien',
                    order: 3,
                    points: 3
                }
            ]
        };

router.get('/pdf/:id', verify, function(req, res) {
    fs.readFile(path.join(__dirname, '../../resources/pdf.html'), 'utf8', function(err, html) {
        if (err) res.status(400).send(err);
        // TODO get sheet and its course from db.
        new PDF().data(JSON.stringify({course: course, sheet: sheet})).html(html).send(res);
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