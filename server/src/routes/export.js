import express from 'express';
import fs from 'fs';
import path from 'path';
import dateformat from 'dateformat';
import verify from '../auth/verify';
import PDF from '../export/pdf';
import {Course} from '../models/course';
import {Sheet, Exercise, Task} from '../models/sheet';

const router = express.Router();

dateformat.i18n = {
    dayNames: [
        'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',
        'Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'
    ],
    monthNames: [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
        'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
    ],
    timeNames: [
        'a', 'p', 'am', 'pm', 'A', 'P', 'AM', 'PM'
    ]
};

router.get('/pdf/:id', verify, function(req, res) {
    fs.readFile(path.join(__dirname, '../../resources/pdf.html'), 'utf8', function(err, html) {
        if (err) res.status(400).send(err);
        let sheetId = req.params.id;
        let obj = {};
        Course.find({sheets: sheetId}).exec((err, docs) => {
            if (err) res.status(400).send(err);
            if (docs === undefined || docs.length === 0) if (err) res.status(404).send('Course not found');
            obj.course = docs[0];
            Sheet.findById(sheetId, (err, sheet) => {
                if (err) res.status(400).send(err);
                if (sheet === undefined) if (err) res.status(404).send('Sheet not found');
                Exercise.find().where('_id').in(sheet.exercises).exec((err, exercises) => {
                    if (err) res.status(400).send(err);
                    obj.sheet = sheet;
                    obj.sheet.exercises = exercises;
                    let promises = [];
                    for (let exercise of sheet.exercises) {
                        promises.push(Task.find().where('_id').in(exercise.tasks).then((docs) => {
                            if (err) res.status(400).send(err);
                            exercise.tasks = docs;
                        }));
                    }
                    Promise.all(promises).then(() => {
                        obj.date = toReadableDate(obj.sheet.submissiondate);
                        obj.template = getTemplate(sheet, 'html');
                        new PDF().addHelper(toAlphabeticOrder).data(JSON.stringify(obj)).html(html).send(res);
                    });
                });
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
                console.error(err);
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
            template += 'Aufgabe ' + sheet.order + '.' + exercise.order + ':' + newLine;
            for (let task of exercise.tasks) {
                let choices = task.choices.join(' | ');
                // Should prevent html from being interpreted.
                if (mode === 'html') {
                    choices = choices.replace('<', '&lt;');
                    choices = choices.replace('>', '&gt;');
                }
                template += toAlphabeticOrder(task.order) + ')  < ' + choices + ' >' + newLine;
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

// FIXME: string is utc, but date() converts it to GMT+2 (local time). +5 Minuten bug.
function toReadableDate(str) {
    return dateformat(new Date(str), 'dddd, dd. mmmm yyyy, hh:mm "Uhr"');
}

export default router;