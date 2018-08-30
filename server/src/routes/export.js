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
            Sheet.findById(sheetId, (err, doc) => {
                if (err) res.status(400).send(err);
                if (docs === undefined) if (err) res.status(404).send('Sheet not found');
                obj.sheet = doc;
                obj.date = toReadableDate(obj.sheet.submissiondate);
                obj.template = getTemplate(doc);
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
                }));
            }
            Promise.all(promises).then(() => {
                // https://stackoverflow.com/questions/21950049/create-a-text-file-in-node-js-from-a-string-and-stream-it-in-response
                res.attachment('template.txt').type('txt').end(getTemplate(sheet));
            }).catch((err) => {
                console.error(err);
            });
        });
    });
});

function getTemplate(sheet) {
    let template = '<Ihre Matrikelnummer>\n';
    for (let exercise of sheet.exercises) {
        if (exercise.tasks !== undefined) {
            template += 'Aufgabe ' + sheet.order + '.' + exercise.order + ':\n';
            for (let task of exercise.tasks) {
                template += toAlphabeticOrder(task.order) + ')  < ' + task.choices.join(' | ') + ' >\n';
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