import express from 'express';
import verify from '../auth/verify';
import bodyParser from 'body-parser';
import {Submission} from '../models/submission';

const router = express.Router();

router.use(bodyParser.urlencoded({
    extended: false
}));
router.use(bodyParser.json());

router.post('/', verify, function(req, res) {
    Submission.findById(req.body.submission.id).then(res => {
        beginCorrection(res.answers)
            .then(() => { res.send('done'); })
            .catch((err) => { res.status(400).send(err); });
    }).catch(err => {
        console.log(err);
        res.status(400).send('error');
    });
    console.log('start auto correct');
});

function beginCorrection(answers) {
    return new Promise(checkAnswerArray(answers));
}

async function checkAnswerArray(answers) {
    for (let answer of answers) {
        console.log(answer);
        let task = answer.task;
        let solution = task.solution;
        console.log(task);
        console.log(solution);
        await new Promise(checkAnswer(answer, solution, task));
    }
    return 'done';
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
            break;
        case 'range':
            // could need parsing beforehand
            if (answer.text >= solution.range.from && answer.text <= solution.range.to) points = task.points;
            break;
        case 'number':
            // could need parsing beforehand
            if (answer.text === solution.number) points = task.points;
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