/* eslint-env mocha */

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import * as correction from '../src/correction/correction';
import {Submission, Answer, Student} from '../src/models/submission';
import {Task, Solution} from '../src/models/sheet';

chai.use(chaiAsPromised).should();

let submission = new Submission({student: new Student({name: 'bla', mat_nr: 123}),
    answers: [new Answer({
        text: '3',
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

it('should not be null', function() {
    chai.assert.isNotNull(submission, 'submission is not null');
});

let error;
it('correction is executed', function(done) {
    correction.beginCorrection(submission.answers, function(err) {
        error = err;
        done();
    });
});

it('correction has error', function() {
    chai.assert.exists(error);
    chai.assert.instanceOf(error, Error, 'Error');
});

it('submission was auto-corrected', function() {
    chai.assert.exists(submission.answers[0].auto_corrected);
    chai.assert.isTrue(submission.answers[0].auto_corrected);
});

/*
it('should begin correction', function(done) {
    correction.beginCorrection(submission.answers).then(() => {
        done();
        it('should find submission', function(done) {
            Submission.findById(subId).then((sub) => {
                done();
                let number = sub.answers[0];
                describe('Answer correction', function() {
                    it('should be auto-corrected', function(done) {
                        chai.assert.isTrue(number.auto_corrected, 'Answer was auto-corrected');
                        done();
                    });
                    it('achieved points should be correct', function(done) {
                        chai.assert.strictEqual(number.achieved_points, 10, 'Achieved points are correct');
                        done();
                    });
                });
            }).catch((err) => { throw err; });
        }).catch((err) => { throw err; });
    });
});
*/
