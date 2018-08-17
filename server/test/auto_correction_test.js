import chai from 'chai';
import * as correction from '../src/correction/correction';
import {Submission, Answer, Student} from '../src/models/submission';
import {Task, Solution} from '../src/models/sheet';

let submission = new Submission({student: new Student({name: 'bla', mat_nr: 123}),
    answers: [new Answer({
        text: '2',
        task: new Task({
            question: 'number task',
            points: 10,
            order: 1,
            choices: 'no',
            solution: new Solution({
                type: 'number',
                number: 2
            })
        })
    })]});
let subId = 0;
chai.assert.isNotNull(submission, 'submission is not null');
submission.save(function(err, sub, number) {
    if (err) throw err;
    subId = sub.id;
    console.log('saved submission with id: ' + subId);
    correction.beginCorrection(submission.answers).then(() => {
        Submission.findById(subId).then((sub) => {
            let number = sub.answers[0];
            chai.assert.isTrue(number.auto_corrected, 'Answer was auto-corrected');
            chai.assert.strictEqual(number.achieved_points, 10, 'Achieved points are correct');
        }).catch((err) => { throw err; });
    }).catch((err) => { throw err; });
});
