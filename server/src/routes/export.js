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
import {logRoute} from '../utils/log';

const router = express.Router();
moment.locale('de');

/**
 * Gets a pdf file with a sheetID
 * @param {string} req.params.id: ID of a sheet.
 * @returns {PDF} with type application/pdf
 * @throws 400
 * @throws 404
 * @throws 500
 */
router.get('/pdf/:id', verify, function(req, res, next) {
    sendReport(req.params.id, 'pdf', res).then(() => {
        next();
    }).catch((err) => {
        req.error = err;
        next();
    });
}, logRoute);

/**
 * Gets a docx file with a sheetID
 * @param {string} req.params.id: ID of a sheet.
 * @returns {DOCX} with type application/vnd.openxmlformats-officedocument.wordprocessingml.document
 * @throws 400
 * @throws 404
 * @throws 500
 */
router.get('/docx/:id', verify, function(req, res, next) {
    sendReport(req.params.id, 'docx', res).then(() => {
        next();
    }).catch((err) => {
        req.error = err;
        next();
    });
}, logRoute);

/**
 * Gets a csv file with a sheetID
 * @param {string} req.params.id: ID of a sheet.
 * @returns {CSV} text/csv
 * @throws 400
 * @throws 404
 * @throws 500
 */
router.get('/csv/:id', verify, function(req, res, next) {
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
        let renderer = new CSVRenderer().addHeader().addToAlphabeticOrder(toAlphabeticOrder);
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
        next();
    }).catch((err) => {
        res.status(500).send(err);
        req.error = err;
        next();
    });
}, logRoute);

/**
 * Gets a tempate file with a sheetID
 * @param {string} req.params.id: ID of a sheet.
 * @returns {TXT} txt
 * @throws 400
 * @throws 404
 * @throws 500
 */
router.get('/template/:id', verify, function(req, res, next) {
    let sheet = {};
    Sheet.findById(req.params.id).exec().then((doc) => {
        sheet = doc;
        Exercise.find().where('_id').in(doc.exercises).exec().then((docs) => {
            sheet.exercises = docs;
            let promises = [];
            for (let exercise of sheet.exercises) {
                promises.push(Task.find().where('_id').in(exercise.tasks).then((docs) => {
                    exercise.tasks = docs;
                    for (let task of exercise.tasks) {
                        task.order = toAlphabeticOrder(task.order);
                    }
                }).catch((err) => {
                    res.status(400).send(err);
                    req.error = err;
                    next();
                }));
            }
            Promise.all(promises).then(() => {
                // https://stackoverflow.com/questions/21950049/create-a-text-file-in-node-js-from-a-string-and-stream-it-in-response
                res.attachment('template.txt').type('txt').end(getTemplate(sheet, 'txt'));
                next();
            }).catch((err) => {
                res.status(500).send(err);
                req.error = err;
                next();
            });
        }).catch((err) => {
            res.status(400).send(err);
            req.error = err;
            next();
        });
    }).catch((err) => {
        res.status(400).send(err);
        req.error = err;
        next();
    });
}, logRoute);

/**
 * This function gets all reporting data,
 * renders it to the specific type of file
 * and sends it to the client.
 * @param {string} id of a {Sheet}.
 * @param {string} type (pdf|docx) of document.
 * @param {object} res express response object.
 */
function sendReport(id, type, res) {
    return new Promise((resolve, reject) => {
        getReportObj(id).then((obj) => {
            let renderer = new Renderer();
            renderer
                .addHelper(toAlphabeticOrder)
                .addHelper(renderer.helpers.calcPoints)
                .addHelper(renderer.helpers.addTemplateExercise)
                .addHelper(renderer.helpers.addNameSubmissionFile)
                .data(JSON.stringify(obj))
                .html(obj.html)
                .name(obj.course.name + ' - ' + obj.sheet.name)
                .output(type)
                .send(res);
            resolve();
        }).catch((err) => {
            reject(err);
        });
    });
}

/**
 * Implementation of accumulating and preparing the report data:
 * template.html
 * {Course} and {Sheet} with exercises and tasks.
 * @param {string} sheetId a {Sheet} id.
 */
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

/**
 * This function parses a numerical order to an alphabetical one.
 * @param {number} numerical a order number.
 * @returns alphabetic character.
 */
function toAlphabeticOrder(numerical) {
    if (numerical < 10) {
        return String.fromCharCode(('' + numerical).charCodeAt() + 16).toLowerCase();
    } else {
        if (numerical < 27) return String.fromCharCode('9'.charCodeAt() + numerical - 9 + 16).toLowerCase();
        return toAlphabeticOrder(1) + toAlphabeticOrder(numerical - 26);
    }
}

/**
 * This function counts up all orders of the report object.
 * @param {object} obj is a report object.
 * @param {number} countUp value that is added to the order.
 * @returns updated report object.
 */
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

/**
 * This function parses a date string to a predefined format.
 * @param {string} str date string.
 */
function toReadableDate(str) {
    return moment(str).format('dddd, D. MMMM YYYY, hh:mm [Uhr]');
}

export default router;