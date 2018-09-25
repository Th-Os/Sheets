import express from 'express';
import verify from '../auth/verify';
import bodyParser from 'body-parser';
import {Submission} from '../models/submission';

class CorrectionError extends Error {}
const router = express.Router();

// TODO: refactor CorrectionError -> don't stop when throwing one error and return all errors as result.
router.get('/:id', verify, function(req, res) {
    let subId = req.params.id;
    Submission.findById(subId).populate({ path: 'answers', populate: { path: 'task', populate: { path: 'solution' } } }).exec().then((submission) => {
        console.log(submission);
        beginCorrection(submission.answers).then(() => {
            Submission.findById(subId).populate({ path: 'answers' }).exec().then((doc) => {
                res.send(doc);
            }).catch((err) => {
                res.status(400).send(err);
            });
        }).catch((err) => {
            res.status(500).send(err);
        });
    }).catch((err) => {
        res.status(400).send(err);
    });
});

function beginCorrection(answers) {
    return new Promise((resolve, reject) => {
        let promises = [];
        let errors = [];
        for (let answer of answers) {
            let task = answer.task;
            let solution = task.solution;
            promises.push(checkAnswer(answer, solution, task));
        }
        Promise.all(promises).then(() => {
            resolve();
        }).catch((err) => {
            errors.push(err);
            reject(errors);
        });
    });
}

/**
 * Returns achieved points or boolean indicating if true or false.
 * @param {*} answer
 * @param {*} solution
 * @param {*} task
 */
function checkAnswer(answer, solution, task) {
    return new Promise((resolve, reject) => {
        let points = 0;
        switch (solution.type) {
            case 'freetext':
            case 'none':
                if (solution.default_free_text) points = task.points;
                break;
            case 'regex':
                if (answer.text.match(solution.regex)) points = task.points;
                break;
            case 'range':
                let value = Number(answer.text);
                if (value >= solution.range.from && value <= solution.range.to) points = task.points;
                break;
            case 'number':
                if (answer.text === solution.number.toString()) points = task.points;
                break;
            default:
                throw Error('No specified type found');
        }
        answer.set({achieved_points: points, auto_corrected: true});
        answer.save().then(() => resolve()).catch((err) => reject(err));
    });
}

/*
function checkAnswer(answer, solution, task) {
    return new Promise((resolve, reject) => {
        let points = 0;
        switch (solution.type) {
            case 'freetext':
            case 'none':
                if (solution.default_free_text === undefined) throw new CorrectionError('free text task has not set a default');
                if (solution.default_free_text) points = task.points;
                break;
            case 'regex':
                if (answer.text.match(solution.regex)) points = task.points;
                else throw new CorrectionError('regex "' + solution.regex + '" does not match "' + answer.text + '"');
                break;
            case 'range':
                let value = Number(answer.text);
                if (value >= solution.range.from && value <= solution.range.to) points = task.points;
                else throw new CorrectionError('range "' + solution.range + '" does not match "' + answer.text + '"');
                break;
            case 'number':
                if (answer.text === solution.number.toString()) points = task.points;
                else throw new CorrectionError('number "' + solution.number + '" does not match "' + answer.text + '"');
                break;
            default:
                throw Error('No specified type found');
        }
        answer.set({achieved_points: points, auto_corrected: true});
        answer.save().then(() => resolve()).catch((err) => reject(err));
    });
}
*/

export {beginCorrection};
export default router;