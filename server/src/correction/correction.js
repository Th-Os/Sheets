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
    Submission.findById(req.body.submission.id).then(res => {
        beginCorrection(res.answers, function(err) {
            if (err == null) res.status(200).send('done');
            else res.status(400).send(err);
        });
    }).catch(err => {
        console.log(err);
        res.status(400).send('not found');
    });
    console.log('start auto correct');
});

function beginCorrection(answers, callback) {
    try {
        checkAnswerArray(answers, callback);
    } catch (err) {
        console.log('catched error before promises' + err.message);
        callback(err);
    }
}

function checkAnswerArray(answers, callback) {
    let promises = [];
    for (let answer of answers) {
        let task = answer.task;
        let solution = task.solution;
        promises.push(new Promise(function(resolve, reject) {
            try {
                checkAnswer(answer, solution, task);
                resolve();
            } catch (err) {
                reject(err);
            }
        }));
    }
    Promise.all(promises).then((answer) => {
        console.log(answer);
        callback();
    }).catch((err) => { callback(err); });
}

/**
 * Returns achieved points or boolean indicating if true or false.
 * @param {*} answer
 * @param {*} solution
 * @param {*} task
 */
function checkAnswer(answer, solution, task) {
    let points = 0;
    switch (solution.type) {
        case 'none':
            points = solution.default_points;
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
            throw Error('No specified Type found');
    }

    answer.set({achieved_points: points, auto_corrected: true});
    answer.save(function(err, answer) {
        if (err) throw err;
        else return answer;
    });
}

export {beginCorrection};
export default router;