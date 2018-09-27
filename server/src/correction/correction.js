/**
 * @overview The routing of the correction API.
 * @author Thomas Oswald
 */

import express from 'express';
import verify from '../auth/verification';
import {Submission} from '../models/submission';
import {CorrectionError} from '../utils/errors';
const router = express.Router();

/**
 * Corrects a submission by id.
 * @param {string} req.params.id: ID of a sheet.
 * @returns {Submission} and depending on the correction an {Array} of {CorrectionError}.
 * @throws 400
 * @throws 404
 * @throws 500
 */
router.get('/:id', verify, function(req, res) {
    let subId = req.params.id;
    Submission.findById(subId).populate({ path: 'answers', populate: { path: 'task', populate: { path: 'solution' } } }).exec().then((submission) => {
        beginCorrection(submission.answers).then((errors) => {
            Submission.findById(subId).populate({ path: 'answers' }).exec().then((doc) => {
                if (errors) res.send({ submission: doc, errors: errors });
                else res.send(doc);
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

/**
 * Starts the correction process with each answer.
 * @param {Array} answers Array of {Answer}.
 * @returns {Promise}
 */
function beginCorrection(answers) {
    return new Promise((resolve, reject) => {
        let promises = [];
        let errors = [];
        for (let answer of answers) {
            let task = answer.task;
            let solution = task.solution;
            promises.push(checkAnswer(answer, solution, task));
        }
        Promise.all(promises).then((errors) => {
            if (errors) resolve(errors);
            else resolve();
        }).catch((err) => {
            errors.push(err);
            reject(errors);
        });
    });
}

/**
 * Validates each answer, saves new points and return the errors of this process.
 * @param {Answer} answer
 * @param {Solution} solution
 * @param {Task} task
 * @returns {Array} of {CorrectionError}
 */
function checkAnswer(answer, solution, task) {
    return new Promise((resolve, reject) => {
        let points = 0;
        let errors = [];
        switch (solution.type) {
            case 'freetext':
            case 'none':
                if (solution.default_free_text === undefined) errors.push(new CorrectionError('free text task has not set a default'));
                if (solution.default_free_text) points = task.points;
                break;
            case 'regex':
                if (answer.text.match(solution.regex)) points = task.points;
                else errors.push(new CorrectionError('regex "' + solution.regex + '" does not match "' + answer.text + '"'));
                break;
            case 'range':
                let value = Number(answer.text);
                if (value >= solution.range.from && value <= solution.range.to) points = task.points;
                else errors.push(new CorrectionError('range "' + solution.range + '" does not match "' + answer.text + '"'));
                break;
            case 'number':
                if (answer.text === solution.number.toString()) points = task.points;
                else errors.push(new CorrectionError('number "' + solution.number + '" does not match "' + answer.text + '"'));
                break;
            default:
                errors.push(Error('No specified type found'));
        }
        answer.set({achieved_points: points, auto_corrected: true});
        answer.save().then(() => resolve(errors)).catch((err) => reject(err));
    });
}

export {beginCorrection}; // for the auto_correction_test.
export default router;