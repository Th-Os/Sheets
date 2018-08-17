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
        checkAnswerArray(res.answers);
    }).catch(err => {
        console.log(err);
    });
    console.log('start auto correct');
    res.send('auto correct started');
});

function checkAnswerArray(answers) {
    for (let answer of answers) {
        console.log(answer);
        let task = answer.task;
        let solution = task.solution;
        console.log(task);
        console.log(solution);
    }
}

export default router;