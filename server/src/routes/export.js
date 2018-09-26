/**
 * @overview The routing of the exports API.
 * @author Thomas Oswald
 */

import express from 'express';
import fs from 'fs';
import path from 'path';
import moment from 'moment';
import * as methods from '../utils/methods';
import {StatusError} from '../utils/errors';
import verify from '../auth/verification';
import Renderer from '../export/renderer';
import CSVRenderer from '../export/csv';
import {Course} from '../models/course';
import {Sheet, Exercise, Task} from '../models/sheet';

const router = express.Router();
moment.locale('de');

router.get('/pdf/:id', verify, function(req, res) {
    sendReport(req.params.id, 'pdf', res);
});

router.get('/word/:id', verify, function(req, res) {
    sendReport(req.params.id, 'docx', res);
});

router.get('/csv/:id', verify, function(req, res) {
    methods.get(req.params.id, Sheet, [
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
    ]).then((sheet) => {
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

function sendReport(id, type, res) {
    getReportObj(id).then((obj) => {
        new Renderer()
            .addHelper(toAlphabeticOrder)
            .addHelper(addTemplateExercise)
            .addHelper(addNameSubmissionFile)
            .data(JSON.stringify(obj))
            .html(obj.html)
            .name(obj.course.name + ' - ' + obj.sheet.name)
            .output(type)
            .send(res);
    }).catch((err) => {
        if (err.name === StatusError.name) res.status(err.status).send(err.message);
        else res.status(500).send(err);
    });
}

function getReportObj(sheetId) {
    return new Promise((resolve, reject) => {
        let obj = {};
        fs.readFile(path.join(__dirname, '../../resources/template.html'), 'utf8', function(err, html) {
            obj.html = html;
            if (err) reject(new StatusError(500, err));
            Course.find({sheets: sheetId}).exec().then((docs) => {
                if (docs === undefined || docs.length === 0) reject(new StatusError(404, 'Course not found'));
                obj.course = docs[0];
                methods.get(sheetId, Sheet, { path: 'exercises', populate: { path: 'tasks' } }).then((sheet) => {
                    obj.sheet = sheet;
                    obj.date = toReadableDate(obj.sheet.submissiondate);
                    obj.template = getTemplate(sheet, 'html');
                    obj = countOrderUpBy(obj, 1);
                    resolve(obj);
                }).catch((err) => reject(new StatusError(400, err)));
            }).catch((err) => reject(new StatusError(400, err)));
        });
    });
}

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

function addTemplateExercise(sheet) {
    console.log(sheet.tempalte);
    if (sheet.template.flag) {
        let html = 'Einhaltung der Abgabekriterien (';
        html += sheet.template.points + ' Punkte)';
        return html;
    } else return '';
}

function addNameSubmissionFile(sheetOrder) {
    if (sheetOrder < 10) return '0' + sheetOrder;
    else return sheetOrder;
}

function countOrderUpBy(obj, countUp) {
    obj.course.order += countUp;
    obj.sheet.order += countUp;
    for (let exercise of obj.sheet.exercises) {
        exercise.order += countUp;
        for (let task of exercise.tasks) {
            task.order += countUp;
        }
    }
    return obj;
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