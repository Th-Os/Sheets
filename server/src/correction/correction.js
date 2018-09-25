import express from 'express';
import verify from '../auth/verify';
import bodyParser from 'body-parser';
import {Submission} from '../models/submission';

class CorrectionError extends Error {}
const router = express.Router();

router.use(bodyParser.urlencoded({
    extended: false
}));
router.use(bodyParser.json());

router.post('/', verify, function(req, res) {
    let id = req.body._id;
    Submission.findById(id).populate('answers.answer').exec().then(res => {
        beginCorrection(res.answers, function(err) {
            if (err == null) {
                Submission.findById(id, function(err, doc) {
                    if (err) res.status(400).send(err);
                    else res.status(200).send(doc);
                });
            } else res.status(400).send(err);
        });
    }).catch(err => {
        res.status(400).send(err);
    });
});

function beginCorrection(answers, callback) {
    try {
        checkAnswerArray(answers, callback);
    } catch (err) {
        callback(err);
    }
}

function checkAnswerArray(answers, callback) {
    console.log(answers)
    let promises = [];
    let errors = [];
    for (let answer of answers) {
        let task = answer.task;
        let solution = task.solution;
        promises.push(new Promise(function(resolve, reject) {
            try {
                checkAnswer(answer, solution, task);
                resolve();
            } catch (err) {
                errors.push(err);
                reject(err);
            }
        }));
    }
    Promise.all(promises).then((output) => {
        callback();
    }).catch((err) => {
        if (err);
        callback(errors);
    });
}

/**
 * Returns achieved points or boolean indicating if true or false.
 * @param {*} answer
 * @param {*} solution
 * @param {*} task
 */
function checkAnswer(answer, solution, task) {
    console.log("correction")
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
    answer.save(function(err, answer) {
        if (err) throw err;
        else return answer;
    });
}

export {beginCorrection};
export default router;