import express from 'express';
import fs from 'fs';
import path from 'path';
import moment from 'moment';
import * as methods from '../utils/methods';
import {RouteError} from '../utils/error';
import verify from '../auth/verify';
import PDFRenderer from '../export/pdf';
import CSVRenderer from '../export/csv';
import DOCXRenderer from '../export/docx';
import {Course} from '../models/course';
import {Sheet, Exercise, Task} from '../models/sheet';

const router = express.Router();
moment.locale('de');

// TODO: refactor RouteError handling. Not working correctly. "HTTP headers set after sending."
router.get('/pdf/:id', verify, function(req, res) {
    fs.readFile(path.join(__dirname, '../../resources/template.html'), 'utf8', function(err, html) {
        if (err) throw new RouteError(500, err, res);
        let sheetId = req.params.id;
        let obj = {};
        Course.find({sheets: sheetId}).exec((err, docs) => {
            if (err) throw new RouteError(400, err, res);
            if (docs === undefined || docs.length === 0) throw new RouteError(404, 'Course not found', res);
            obj.course = docs[0];
            Sheet.findById(sheetId, (err, sheet) => {
                if (err) throw new RouteError(400, err, res);
                if (sheet === undefined || sheet === null) throw new RouteError(404, 'Sheet not found', res);
                Exercise.find().where('_id').in(sheet.exercises).exec((err, exercises) => {
                    if (err) throw new RouteError(400, err, res);
                    if (exercises === undefined || exercises.length === 0) throw new RouteError(404, 'Exercises not found', res);
                    obj.sheet = sheet;
                    obj.sheet.exercises = exercises;
                    let promises = [];
                    for (let exercise of sheet.exercises) {
                        promises.push(Task.find().where('_id').in(exercise.tasks).then((tasks) => {
                            if (tasks === undefined || tasks.length === 0) throw new RouteError(404, 'Tasks not found', res);
                            exercise.tasks = tasks;
                        }).catch((err) => res.status(500).send(err)));
                    }
                    Promise.all(promises).then(() => {
                        obj.date = toReadableDate(obj.sheet.submissiondate);
                        obj.template = getTemplate(sheet, 'html');
                        new PDFRenderer().addHelper(toAlphabeticOrder).data(JSON.stringify(obj)).html(html).send(res);
                    }).catch((err) => console.error(err));
                });
            });
        });
    });
});

router.get('/word/:id', verify, function(req, res) {
    fs.readFile(path.join(__dirname, '../../resources/template.html'), 'utf8', function(err, html) {
        try {
            if (err) throw new RouteError(500, err, res);
            let sheetId = req.params.id;
            let obj = {};
            Course.find({sheets: sheetId}).exec((err, docs) => {
                if (err) throw new RouteError(500, err, res);
                if (docs === undefined || docs.length === 0) throw new RouteError(404, 'Course not found', res);
                obj.course = docs[0];
                Sheet.findById(sheetId, (err, sheet) => {
                    if (err) throw new RouteError(500, err, res);
                    if (sheet === undefined || sheet === null) throw new RouteError(404, 'Sheet not found', res);
                    Exercise.find().where('_id').in(sheet.exercises).exec((err, exercises) => {
                        if (err) throw new RouteError(500, err, res);
                        if (exercises === undefined || exercises.length === 0) throw new RouteError(404, 'Exercises not found', res);
                        obj.sheet = sheet;
                        obj.sheet.exercises = exercises;
                        let promises = [];
                        for (let exercise of sheet.exercises) {
                            promises.push(Task.find().where('_id').in(exercise.tasks).then((tasks) => {
                                if (tasks === undefined || tasks.length === 0) throw new RouteError(404, 'Tasks not found', res);
                                exercise.tasks = tasks;
                            }).catch((err) => { throw new RouteError(500, err, res); }));
                        }
                        Promise.all(promises).then(() => {
                            obj.date = toReadableDate(obj.sheet.submissiondate);
                            obj.template = getTemplate(sheet, 'html');
                            new DOCXRenderer().addHelper(toAlphabeticOrder).data(JSON.stringify(obj)).html(html).name(obj.course.name + ' - ' + sheet.name).send(res);
                        }).catch((err) => { throw new RouteError(500, err, res); });
                    });
                });
            });
        } catch (err) {
            throw new RouteError(500, err, res);
        }
    });
});

router.get('/csv/:id', verify, function(req, res) {
    Sheet.findById(req.params.id).populate([
        {
            path: 'exercises',
            model: 'Exercise',
            populate:
                {
                    path: 'tasks',
                    model: 'Task',
                    populate: { path: 'solution' }
                }
        }, {
            path: 'submissions',
            model: 'Submission',
            populate:
                [
                    {
                        path: 'answers',
                        model: 'Answer',
                        populate:
                            {
                                path: 'task',
                                populate: { path: 'solution' }
                            }
                    },
                    {
                        path: 'student'
                    }
                ]
        }
    ]).exec().then((sheet) => {
        let renderer = new CSVRenderer().addHeader();
        for (let s of sheet.submissions) {
            let maxPoints = 0;
            for (let a of s.answers) {
                maxPoints += a.task.points;
                a.task.exercise = 0;
            }
            if (sheet.template.flag) maxPoints += sheet.template.points;
            renderer.addSubmission(s, sheet.exercises, sheet.order, sheet.min_req_points, maxPoints, sheet.template);
        }
        res.attachment('output.csv').type('text/csv').end(renderer.export());
    }).catch((err) => res.status(500).send(err));
});

router.get('/template/:id', verify, function(req, res) {
    let sheet = {};
    Sheet.findById(req.params.id, (err, doc) => {
        if (err) res.status(400).send(err);
        sheet = doc;
        Exercise.find().where('_id').in(doc.exercises).exec((err, docs) => {
            if (err) res.status(400).send(err);
            sheet.exercises = docs;
            let promises = [];
            for (let exercise of sheet.exercises) {
                promises.push(Task.find().where('_id').in(exercise.tasks).then((docs) => {
                    if (err) res.status(400).send(err);
                    exercise.tasks = docs;
                    for (let task of exercise.tasks) {
                        task.order = toAlphabeticOrder(task.order);
                    }
                }));
            }
            Promise.all(promises).then(() => {
                // https://stackoverflow.com/questions/21950049/create-a-text-file-in-node-js-from-a-string-and-stream-it-in-response
                res.attachment('template.txt').type('txt').end(getTemplate(sheet, 'txt'));
            }).catch((err) => {
                res.status(500).send(err);
            });
        });
    });
});

/**
 * Parses a sheet to a template.
 * This function uses replacing of '<' and '>' to prevent html to be interpreted.
 * Furthermore, it adds linebreaks to its output depending on the mode.
 * @param {*} sheet a sheet object.
 * @param {*} mode (txt|html)
 */
function getTemplate(sheet, mode) {
    let newLine = (mode === 'txt') ? '\n' : '<br>';
    let template = (mode === 'txt') ? '<Ihre Matrikelnummer>' : '&lt;Ihre Matrikelnummer&gt;';
    template += newLine;
    for (let exercise of sheet.exercises) {
        if (exercise.tasks !== undefined) {
            template += 'Aufgabe ' + (sheet.order + 1) + '.' + (exercise.order + 1) + ':' + newLine;
            for (let task of exercise.tasks) {
                let choices = task.choices.join(' | ');
                // Should prevent html from being interpreted.
                if (mode === 'html') {
                    choices = choices.replace('<', '&lt;');
                    choices = choices.replace('>', '&gt;');
                }
                template += toAlphabeticOrder(task.order + 1) + ')  < ' + choices + ' >' + newLine;
            }
        }
    }
    return template;
}

function toAlphabeticOrder(numerical) {
    if (numerical < 10) {
        return String.fromCharCode(('' + numerical).charCodeAt() + 16).toLowerCase();
    } else {
        if (numerical < 27) return String.fromCharCode('9'.charCodeAt() + numerical - 9 + 16).toLowerCase();
        return toAlphabeticOrder(1) + toAlphabeticOrder(numerical - 26);
    }
}

function toReadableDate(str) {
    return moment(str).format('dddd, D. MMMM YYYY, hh:mm [Uhr]');
}

export default router;